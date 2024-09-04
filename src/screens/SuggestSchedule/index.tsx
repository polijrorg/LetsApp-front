/* eslint-disable radix */
import * as S from './styles';
import Button from '@components/Button';
import CardSchedule from '@components/CardSchedule';
import useAuth from '@hooks/useAuth';
import useInvite from '@hooks/useInvite';
import CalendarServices from '@services/CalendarServices';
import { theme } from '@styles/default.theme';
import format from 'date-fns/format';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('mandatory guests: ', mandatoryContactSelected.map(
      (contact) => contact.email || contact.phone
    ));
    console.log('duration:', parseInt(duration));
    console.log('beginDate :', moment(dateStart).tz('America/Sao_Paulo')
    .startOf('day')
    .format());
    console.log('beginHour :', format(timeStart, 'HH:mm') + ':00');
    console.log('endDate :', moment(dateEnd).tz('America/Sao_Paulo').startOf('day')
    .format());
    console.log('endHour :', format(timeEnd, 'HH:mm') + ':00');
    getSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getSchedules() {
    try {
      const response = await CalendarServices.getRecommendedTime({
        phone: user?.phone,
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
      filterSchedulesByDay(response.freeTimes);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const filterSchedulesByDay = (freeTimes) => {
    const initialValue = {};
    const filteredSchedules = freeTimes.reduce((acc, schedule) => {
      const weekDay = moment(schedule.start)
        .format('dddd')
        .replace(/-[^-]*/g, '');
      const day = weekDay + moment(schedule.start).format(' - DD/MM');
      const formatedDay = day.replace(/^./, day[0].toUpperCase());

      if (!acc[formatedDay]) {
        acc[formatedDay] = [];
      }

      acc[formatedDay].push(schedule);

      return acc;
    }, initialValue);

    setSchedulesByDate(filteredSchedules);
  };

  moment.locale('pt-br');

  const [selectedCardsByDay, setSelectedCardsByDay] = useState<{
    [day: string]: number | null;
  }>({});

  const handleCardSelect = (day: string, index: number) => {
    setSelectedCardsByDay((prevSelected) => ({
      [day]: prevSelected[day] === index ? null : index,
    }));
  };

  return (
    <>
      {isLoading && (
        <S.SpinnerWrapper>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </S.SpinnerWrapper>
      )}
      <S.Body>
        <S.ContainerTitle>
          <S.Title>Sugerir Horário</S.Title>
        </S.ContainerTitle>
        {Object.entries(schedulesByDate).length === 0 && !isLoading && (
          <S.EmptyText>
            ⚠️ Não existe nenhum horário disponível no intervalo de datas e
            horas selecionados!
          </S.EmptyText>
        )}
        <S.Scroll showsVerticalScrollIndicator={false}>
          {Object.entries(schedulesByDate).map(([day]) => {
            const selectedDayIndex = selectedCardsByDay[day];
            return (
              <S.ScheduleContainer key={day}>
                <S.Subtitle>{day}</S.Subtitle>

                <S.Scroll horizontal showsHorizontalScrollIndicator={false}>
                  <S.ContainerSuggest>
                    {schedulesByDate[day].map((schedule, index) => {
                      const isSelected = index === selectedDayIndex;
                      return (
                        <CardSchedule
                          key={index}
                          start={moment(schedule.start).format('HH:mm')}
                          end={moment(schedule.end).format('HH:mm')}
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
                </S.Scroll>
              </S.ScheduleContainer>
            );
          })}
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
    </>
  );
};

export default SuggestSchedule;
