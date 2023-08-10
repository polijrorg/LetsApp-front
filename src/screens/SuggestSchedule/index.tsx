/* eslint-disable radix */
import * as S from './styles';
import Button from '@components/Button';
import CardSchedule from '@components/CardSchedule';
import { api } from '@services/api';
import format from 'date-fns/format';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { ProfileContext } from 'src/contexts/ProfileContext';

const SuggestSchedule: React.FC = ({ navigation }) => {
  const { phoneUser, dateStart, dateEnd, timeStart, timeEnd, duration } =
    useContext(ProfileContext);

  const [schedules, setSchedules] = useState([]);

  const divided = duration.split(':');
  const hours = parseInt(divided[0]);
  const minutes = parseInt(divided[1]);
  const durationFormatted = hours * 60 + minutes;

  useEffect(() => {
    getSchedules();
  }, []);

  async function getSchedules() {
    try {
      const { data } = await api.post('/getRecommededTimes', {
        phone: phoneUser,
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

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (schedule) => {
    setSelectedCard(schedule);
    console.log('teste', schedule);
  };

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.ContainerTitle>
        <S.Title>Sugerir Horário</S.Title>
      </S.ContainerTitle>
      <S.Scroll horizontal showsHorizontalScrollIndicator={false}>
        <S.Scroll showsVerticalScrollIndicator={false}>
          {/* <S.Subtitle>Segunda - 30/01 </S.Subtitle>
        <S.ContainerSuggest>
          <CardSchedule day="Seg" date="30" schedule="16h às 17h" />
          <CardSchedule day="Seg" date="30" schedule="17h às 18h" />
        </S.ContainerSuggest>
        <S.Subtitle>Quarta - 01/02 </S.Subtitle>
        <S.ContainerSuggest>
          <CardSchedule day="Qua" date="01" schedule="18h às 19h" />
          <CardSchedule day="Qua" date="01" schedule="19h às 20h" />
        </S.ContainerSuggest> */}

          {/* <S.ContainerSuggest>
            {schedules.map((schedule, index) => (
              <React.Fragment key={index}>
                <S.ContainerSuggest>
                  <S.Subtitle>
                    {moment(schedule.start1)
                      .format('dddd')
                      .replace(/^\w/, (c) => c.toUpperCase())}{' '}
                    - {moment(schedule.start1).format('DD/MM')}
                  </S.Subtitle>
                  <CardSchedule
                    day={moment(schedule.start1).format('DD')}
                    date={moment(schedule.start1)
                      .format('ddd')
                      .replace(/^\w/, (c) => c.toUpperCase())}
                    start={moment(schedule.start1).format('HH:mm')}
                    end={moment(schedule.end1).format('HH:mm')}
                  />
                </S.ContainerSuggest>
              </React.Fragment>
            ))}
          </S.ContainerSuggest> */}

          {Object.entries(schedulesByDay).map(([day, daySchedules]) => (
            <S.ScheduleContainer key={day}>
              <S.Subtitle>{day}</S.Subtitle>
              <S.ContainerSuggest>
                {(daySchedules as Array<any>).map((schedule, index) => (
                  <CardSchedule
                    key={index}
                    day={moment(schedule.start1).format('DD')}
                    date={moment(schedule.start1)
                      .format('ddd')
                      .replace(/^\w/, (c) => c.toUpperCase())}
                    start={moment(schedule.start1).format('HH:mm')}
                    end={moment(schedule.end1).format('HH:mm')}
                    onClick={() => handleCardClick(schedule)}
                  />
                ))}
              </S.ContainerSuggest>
            </S.ScheduleContainer>
          ))}
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
