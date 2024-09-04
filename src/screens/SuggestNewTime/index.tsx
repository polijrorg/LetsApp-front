import * as S from './styles';
import Button from '@components/Button';
import CardSchedule from '@components/CardSchedule';
import useAuth from '@hooks/useAuth';
import useInvite from '@hooks/useInvite';
import CalendarServices from '@services/CalendarServices';
import { AppError } from '@utils/AppError';
import moment from 'moment-timezone';
import format from 'date-fns/format';
import 'moment/locale/pt-br';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { parse } from 'path';
import { Invite } from '@screens/MainScreen/styles';

// interface SchedulesByDate {
//   date: Object;
// }

const SuggestNewTime = ({ navigation, route }) => {
  const { selectedSchedule, setSelectedSchedule, mandatoryContactSelected, dateStart, dateEnd, timeEnd, timeStart, duration } = useInvite();
  const invite = route.params.invite;
  const { user } = useAuth();
  console.log('selectedDayIndex:', selectedSchedule);
  const calculateDuration = (begin, end) => {
    const beginDate = new Date(begin);
    const endDate = new Date(end);
    const durationInMinutes: number = (Number(endDate) - Number(beginDate)) / 60000;
    return durationInMinutes; // converte de milissegundos para minutos
  };
  function extractTime(isoDateTime) {
    const date = new Date(isoDateTime);
    // Formatando para obter horas, minutos e segundos
    const hours = date.getHours().toString().padStart(2, '0'); // garante dois dígitos para a hora
    const minutes = date.getMinutes().toString().padStart(2, '0'); // garante dois dígitos para os minutos
    return `${hours}:${minutes}:00`;
  }
  
  // Calculando a duração do evento específico


  const [schedulesByDate, setSchedulesByDate] = useState({});

  useEffect(() => {
    const tryDuration = calculateDuration(invite.element.begin, invite.element.end);
    console.log('invite:', invite);
    console.log('mandatory guests: ', [invite.element.phone]);
    console.log('dateStart :', moment(invite.element.beginSearch)
        .tz('America/Sao_Paulo')
        .startOf('day')
        .format());
    console.log('beginHour :', extractTime(invite.element.beginSearch));
    console.log('endDate :', moment(invite.element.endSearch)
        .tz('America/Sao_Paulo')
        .startOf('day')
        .format());
   console.log('endHour :', extractTime(invite.element.endSearch));
    console.log('mandatoryGuests', mandatoryContactSelected.map(
          (contact) => contact.email || contact.phone
        ));
        console.log('inviteId:', invite.element.id);
        console.log('tryDuration:', tryDuration);
    getSchedules();
  }, []);

  async function getSchedules() {
    console.log(invite.element);
    try {
      // const response = await CalendarServices.getSuggestedNewTimes({
      //   phone: user?.phone,
      //   inviteId: invite.element.id,
      // });
    const tryDuration = calculateDuration(invite.element.begin, invite.element.end).toString();
      const sRespponse = await CalendarServices.getRecommendedTime({
        phone: user?.phone,
        beginDate: moment(invite.element.beginSearch)
          .tz('America/Sao_Paulo')
          .startOf('day')
          .format(),
        beginHour: extractTime(invite.element.beginSearch),
        duration: parseInt(tryDuration),
        endDate: moment(invite.element.endSearch)
          .tz('America/Sao_Paulo')
          .startOf('day')
          .format(),
        endHour: extractTime(invite.element.endSearch),
        mandatoryGuests: mandatoryContactSelected.map(
          (contact) => contact.email || contact.phone
        ),
      });
      console.log('sRespponse:', sRespponse);
      filterSchedulesByDay(sRespponse.freeTimes);

      //filterSchedulesByDay(response.freeTimes);
    } catch (error) {
      console.log(error);
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
      ...prevSelected,
      [day]: prevSelected[day] === index ? null : index,
    }));
  };

  const handleUpdateEvent = async () => {
    try {
      const response = await CalendarServices.updateEvent({
        phone: user?.phone,
        idInvite: invite.id,
        begin: selectedSchedule.start,
        end: selectedSchedule.end,
      });
      console.log('updateResponse:', response);
    } catch (error) {
      throw new AppError(error);
    }
  };

  return (
    <S.Body>
      <S.ContainerTitle>
        <S.Title>Modificar Horário</S.Title>
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
              </S.ScheduleContainer>
            );
          })}
        </S.Scroll>
      </S.Scroll>
      <S.Buttons>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ScreenInvite', { invite: invite });
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
            handleUpdateEvent();
            navigation.navigate('MainScreen');
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

export default SuggestNewTime;
