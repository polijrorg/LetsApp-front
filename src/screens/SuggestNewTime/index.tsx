import * as S from './styles';
import Button from '@components/Button';
import CardSchedule from '@components/CardSchedule';
import useAuth from '@hooks/useAuth';
import useInvite from '@hooks/useInvite';
import CalendarServices from '@services/CalendarServices';
import { AppError } from '@utils/AppError';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

// interface SchedulesByDate {
//   date: Object;
// }

const SuggestNewTime = ({ navigation, route }) => {
  const { selectedSchedule, setSelectedSchedule } = useInvite();
  const invite = route.params.invite;
  const { user } = useAuth();

  const [schedulesByDate, setSchedulesByDate] = useState({});

  useEffect(() => {
    getSchedules();
  });

  async function getSchedules() {
    console.log(invite.element);
    try {
      const response = await CalendarServices.getSuggestedNewTimes({
        phone: user.phone,
        inviteId: invite.element.id,
      });

      filterSchedulesByDay(response.freeTimes);
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
        phone: user.phone,
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
