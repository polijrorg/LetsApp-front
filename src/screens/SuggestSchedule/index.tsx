/* eslint-disable radix */
import * as S from './styles';
import Button from '@components/Button';
import CardSchedule from '@components/CardSchedule';
import useAuth from '@hooks/useAuth';
import { api } from '@services/api';
import format from 'date-fns/format';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import useProfile from 'src/contexts/useProfile';

const SuggestSchedule = ({ navigation }) => {
  const {
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    duration,
    timeSelectedStart,
    timeSelectedEnd,
    contactSelected,
  } = useProfile();

  const { user } = useAuth();

  console.log(
    'selecionados',
    timeStart,
    user.phone,
    dateStart,
    dateEnd,
    duration,
    timeSelectedStart,
    timeSelectedEnd
  );

  const [schedules, setSchedules] = useState([]);

  const divided = duration.split(':');
  const hours = parseInt(divided[0]);
  const minutes = parseInt(divided[1]);
  const durationFormatted = hours * 60 + minutes;

  useEffect(() => {
    getSchedules();
  });

  const phoneNumbersArray = contactSelected.map((guest) => guest.phoneNumber);

  async function getSchedules() {
    try {
      const { data } = await api.post('/getRecommededTimes', {
        phone: '+5511953975915',
        beginDate: moment(dateStart)
          .tz('America/Sao_Paulo')
          .startOf('day')
          .format(),
        beginHour: format(timeStart, 'HH:mm:ss'),
        duration: durationFormatted,
        endDate: moment(dateEnd)
          .tz('America/Sao_Paulo')
          .startOf('day')
          .format(),
        endHour: format(timeEnd, 'HH:mm:ss'),
        mandatoryGuests: [],
      });
      setSchedules(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  moment.locale('pt-br');

  const schedulesByDay = schedules.reduce((acc, schedule) => {
    const day = moment(schedule.start1)
      .format('dddd - DD/MM')
      .replace(/^\w/, (c) => c.toUpperCase());

    if (!acc[day]) {
      acc[day] = [];
    }

    acc[day].push(schedule);

    return acc;
  }, {});

  // const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
  //   null
  // );

  // const handleCardSelect = (index: number) => {
  //   if (selectedCardIndex === index) {
  //     setSelectedCardIndex(null); // Deselect the currently selected card
  //   } else {
  //     setSelectedCardIndex(index);
  //   }
  // };

  const [selectedCardsByDay, setSelectedCardsByDay] = useState<{
    [day: string]: number | null;
  }>({});

  const handleCardSelect = (day: string, index: number) => {
    setSelectedCardsByDay((prevSelected) => ({
      ...prevSelected,
      [day]: prevSelected[day] === index ? null : index,
    }));
  };

  return (
    <S.Body>
      <S.ContainerTitle>
        <S.Title>Sugerir Horário</S.Title>
      </S.ContainerTitle>
      <S.Scroll horizontal showsHorizontalScrollIndicator={false}>
        <S.Scroll showsVerticalScrollIndicator={false}>
          {Object.entries(schedulesByDay).map(([day, daySchedules]) => {
            const selectedDayIndex = selectedCardsByDay[day];
            return (
              <S.ScheduleContainer key={day}>
                <S.Subtitle>{day}</S.Subtitle>
                <S.ContainerSuggest>
                  {(daySchedules as Array<any>).map((schedule, index) => {
                    const isSelected = index === selectedDayIndex;
                    return (
                      <CardSchedule
                        key={index}
                        day={moment(schedule.start1).format('DD')}
                        date={moment(schedule.start1)
                          .format('ddd')
                          .replace(/^\w/, (c) => c.toUpperCase())}
                        start={moment(schedule.start1).format('HH:mm')}
                        end={moment(schedule.end1).format('HH:mm')}
                        scheduleStart={schedule.start1}
                        scheduleEnd={schedule.end1}
                        isSelected={isSelected}
                        onSelect={() => handleCardSelect(day, index)}
                      />
                    );
                  })}
                </S.ContainerSuggest>
              </S.ScheduleContainer>
            );
          })}
        </S.Scroll>
      </S.Scroll>
      <S.Buttons>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DateAndSchedule');
          }}
        >
          <Button
            width="136px"
            backgroundColor="#FAFAFA"
            borderColor="#949494"
            hasIcon={false}
            title="Voltar"
            titleColor="#949494"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateEvent');
          }}
        >
          <Button
            width="136px"
            backgroundColor="#3446E4"
            borderColor="transparent"
            hasIcon={false}
            title="Próximo"
            titleColor="#FAFAFA"
          />
        </TouchableOpacity>
      </S.Buttons>
    </S.Body>
  );
};

export default SuggestSchedule;
