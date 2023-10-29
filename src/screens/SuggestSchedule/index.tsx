/* eslint-disable radix */
import * as S from './styles';
import Button from '@components/Button';
import CardSchedule from '@components/CardSchedule';
import useAuth from '@hooks/useAuth';
import useInvite from '@hooks/useInvite';
import CalendarServices from '@services/CalendarServices';
import format from 'date-fns/format';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

// interface SchedulesByDate {
//   date: Object;
// }

const SuggestSchedule = ({ navigation }) => {
  const {
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    duration,
    mandatoryContactSelected,
    selectedSchedule,
    setSelectedSchedule,
  } = useInvite();

  const { user } = useAuth();

  const [schedulesByDate, setSchedulesByDate] = useState({});

  useEffect(() => {
    getSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getSchedules() {
    try {
      console.log('entrou');
      const response = await CalendarServices.getRecommendedTime({
        phone: user.phone,
        beginDate: moment(dateStart)
          .tz('America/Sao_Paulo')
          .startOf('day')
          .format(),
        beginHour: format(timeStart, 'HH:mm') + ':00',
        duration: parseInt(duration),
        endDate: moment(dateEnd)
          .tz('America/Sao_Paulo')
          .startOf('day')
          .format(),
        endHour: format(timeEnd, 'HH:mm') + ':00',
        mandatoryGuests: mandatoryContactSelected.map(
          (contact) => contact.email || contact.phone
        ),
      });
      // console.log(moment(response.freeTimes[0].start).format('dddd - DD/MM'));
      filterSchedulesByDay(response.freeTimes);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const filterSchedulesByDay = (freeTimes) => {
    const initialValue = {};
    const filteredSchedules = freeTimes.reduce((acc, schedule) => {
      const day = moment(schedule.start).format('dddd - DD/MM');

      if (!acc[day]) {
        acc[day] = [];
      }

      acc[day].push(schedule);

      return acc;
    }, initialValue);

    setSchedulesByDate(filteredSchedules);
  };

  moment.locale('pt-br');

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

  // console.log('selectedCardsByDay', selectedCardsByDay);
  // console.log('selectedSchedule', selectedSchedule);

  return (
    <S.Body>
      <S.ContainerTitle>
        <S.Title>Sugerir Horário</S.Title>
      </S.ContainerTitle>
      <S.Scroll horizontal showsHorizontalScrollIndicator={false}>
        <S.Scroll showsVerticalScrollIndicator={false}>
          {Object.entries(schedulesByDate).map(([day]) => {
            const selectedDayIndex = selectedCardsByDay[day];
            return (
              <S.ScheduleContainer key={day}>
                <S.Subtitle>{day}</S.Subtitle>
                <S.ContainerSuggest>
                  {schedulesByDate[day].map((schedule, index) => {
                    const isSelected = index === selectedDayIndex;
                    return (
                      <CardSchedule
                        key={index}
                        day={moment(schedule.start).format('DD')}
                        date={moment(schedule.start)
                          .format('ddd')
                          .replace(/^\w/, (c) => c.toUpperCase())}
                        start={moment(schedule.start).format('HH:mm')}
                        end={moment(schedule.end).format('HH:mm')}
                        scheduleStart={schedule.start}
                        scheduleEnd={schedule.end}
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
            navigation.navigate('CreateEvent', {
              selectedSchedule,
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
