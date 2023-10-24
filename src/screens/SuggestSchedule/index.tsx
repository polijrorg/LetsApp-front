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

const SuggestSchedule = ({ navigation, route }) => {
  const { dateStart, dateEnd, timeStart, timeEnd, duration } = useProfile();

  const { mandatoryContactSelected, contactSelected } = route.params;

  const { user } = useAuth();

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const phoneNumbersArray = contactSelected.map((guest) => guest.phoneNumber);

  const [selectedSchedule, setSelectedSchedule] = useState();

  async function getSchedules() {
    try {
      console.log('entrou');
      const { data } = await api.post('/getRecommededTimes', {
        phone: user.phone,
        beginDate: moment(dateStart)
          .tz('America/Sao_Paulo')
          .startOf('day')
          .format(),
        beginHour: format(timeStart, 'HH:mm') + ':00',
        duration: duration,
        endDate: moment(dateEnd)
          .tz('America/Sao_Paulo')
          .startOf('day')
          .format(),
        endHour: format(timeEnd, 'HH:mm') + ':00',
        mandatoryGuests: mandatoryContactSelected.map(
          (contact) => contact.email
        ),
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

  console.log('selectedSchedule', selectedSchedule);

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
                        onSelect={() => {
                          handleCardSelect(day, index);
                          if (!isSelected) {
                            setSelectedSchedule(schedule);
                          }
                        }}
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
            // handleCreateEvent();
            navigation.navigate('CreateEvent', {
              selectedSchedule,
              mandatoryContactSelected,
              contactSelected,
            });
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
