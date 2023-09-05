import * as S from './styles';
import CardsEvent from '@components/CardsEvent';
import CardsInvite from '@components/CardsInvite';
import { ModalCalendar } from '@components/ModalCalendar';
import { api } from '@services/api';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { ProfileContext } from 'src/contexts/ProfileContext';

const IconProfile = require('../../assets/UserCircle.png');
const IconMore = require('../../assets/IconMore.png');

const Picture2 = require('../../assets/picture2.png');

const MainScreen = ({ navigation }) => {
  const { nameUser, imageOfUser, phoneUser } = useContext(ProfileContext);

  const [open, setOpen] = useState(true);
  const [showCompleteCalendar] = useState(false);

  const dates = [15, 16];

  function getDaysArray(year: number) {
    const names = Object.freeze([
      'domingo',
      'segunda',
      'terça',
      'quarta',
      'quinta',
      'sexta',
      'sábado',
    ]);

    let monthIndex = 0;

    const result: string[] = [];

    while (monthIndex < 12) {
      const date = new Date(year, monthIndex, 1);

      while (date.getMonth() === monthIndex) {
        result.push(`${date.getDate()}-${names[date.getDay()]}`);

        date.setDate(date.getDate() + 1);
      }
      monthIndex++;
    }
    return result;
  }

  function getWeeks() {
    const days = getDaysArray(2023);

    let separeteWeeks: string[][] = [];

    let week: string[] = [];

    for (let i = 0; i < days.length; i++) {
      let day = days[i].split('-');

      if (i === 0 && day[1] !== 'domingo') {
        if (day[1] === 'segunda') {
          week.push('31 - domingo');
        } else {
          if (day[1] === 'terça') {
            week.push('30-domingo', '31-segunda');
          } else {
            if (day[1] === 'quarta') {
              week.push('29-domingo', '30-segunda', '31-terça');
            } else {
              if (day[1] === 'quinta') {
                week.push('28-domingo', '29-segunda', '30-terça', '31-quarta');
              } else {
                if (day[1] === 'sexta') {
                  week.push(
                    '27-domingo',
                    '28-segunda',
                    '29-terça',
                    '30-quarta',
                    '31-quinta'
                  );
                } else {
                  if (day[1] === 'sábado') {
                    week.push(
                      '26-domingo',
                      '27-segunda',
                      '28-terça',
                      '29-quarta',
                      '30-quinta',
                      '31-sexta'
                    );
                  }
                }
              }
            }
          }
        }
      }

      if (day[1] !== 'sábado') {
        week.push(days[i]);

        if (i === days.length - 1) {
          if (day[1] === 'segunda') {
            week.push('1-terça', '2-quarta', '3-quinta', '4-sexta', '5-sábado');
          } else {
            if (day[1] === 'terça') {
              week.push('1-quarta', '2-quinta', '3-sexta', '4-sábado');
            } else {
              if (day[1] === 'quarta') {
                week.push('1-quinta', '2-sexta', '3-sábado');
              } else {
                if (day[1] === 'quinta') {
                  week.push('1-sexta', '2-sábado');
                } else {
                  if (day[1] === 'sexta') {
                    week.push('1-sábado');
                  } else {
                    if (day[1] === 'domingo') {
                      week.push(
                        '1-segunda',
                        '2-terça',
                        '3-quarta',
                        '4-quinta',
                        '5-sexta',
                        '6-sábado'
                      );
                    }
                  }
                }
              }
            }
          }

          separeteWeeks.push(week);

          week = [];
        }
      } else {
        week.push(days[i]);

        separeteWeeks.push(week);

        week = [];
      }
    }

    return separeteWeeks;
  }

  function daysIntoYear(date: Date) {
    return (
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(date.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1000
    );
  }

  function getWeekCalendar() {
    const allWeeks = getWeeks();

    const dayOfYear = daysIntoYear(new Date());

    let weekOfYear = Math.ceil(dayOfYear / 7);

    let weeksOfActualMonth: string[][] = [];

    weeksOfActualMonth.push(allWeeks[weekOfYear - 1]);

    const week = (
      <>
        {weeksOfActualMonth.map((week) => {
          return (
            <>
              {week.map((day) => {
                const separateDay = day.split('-');

                return (
                  <>
                    <S.DayContainer
                      today={
                        new Date().getDate() === Number(separateDay[0])
                          ? true
                          : false
                      }
                    >
                      <S.DayText>
                        {separateDay[1].split('')[0].toUpperCase()}
                      </S.DayText>

                      {dates.filter((date) => date === Number(separateDay[0]))
                        .length !== 0 && (
                        <S.CalendarImg
                          name={
                            Number(separateDay[0]) === 16
                              ? 'bell-outline'
                              : 'alert-circle-outline'
                          }
                        />
                      )}

                      <S.DayText>{separateDay[0]}</S.DayText>
                    </S.DayContainer>
                  </>
                );
              })}
            </>
          );
        })}
      </>
    );

    return week;
  }

  useEffect(() => {
    getInvites();
  });

  async function getInvites() {
    try {
      const { data } = await api.post('invites/listInvitesByUser', {
        phone: phoneUser,
      });
      setInvites(data);
      setNumberInvites(data.length);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }

    try {
      const { data } = await api.post('invites/listEventsByUser', {
        phone: phoneUser,
      });
      setEvents(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [selectedOption, setSelectedOption] = useState('invite'); // Inicialmente seleciona o botão de eventos
  const [showEvent, setShowEvent] = useState(false);
  const [invites, setInvites] = useState([]);
  const [events, setEvents] = useState([]);
  const [numberInvites, setNumberInvites] = useState();

  const handleEventsPress = () => {
    setSelectedOption('events');
    setShowEvent(true);
  };

  const handleInvitePress = () => {
    setSelectedOption('invite');
    setShowEvent(false);
  };

  return (
    <S.Container>
      <ModalCalendar Open={open} setOpen={setOpen} />
      <S.Header>
        <S.Name>Olá {nameUser}!</S.Name>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              'Profile'
              // name: name,
              // imageUser: imageUser,
            );
          }}
        >
          {imageOfUser ? (
            <S.Icon source={imageOfUser} />
          ) : (
            <S.Icon source={IconProfile} />
          )}
        </TouchableOpacity>
      </S.Header>
      {!showCompleteCalendar && (
        <S.CalendarContainer>{getWeekCalendar()}</S.CalendarContainer>
      )}
      <StatusBar hidden={true} />
      <S.Body>
        <S.ContainerOptions>
          <S.OptionEvents onPress={handleEventsPress} Option={selectedOption}>
            <S.Events Option={selectedOption}>Eventos</S.Events>
          </S.OptionEvents>
          <S.OptionInvite onPress={handleInvitePress} Option={selectedOption}>
            <S.Invite Option={selectedOption}>Convites</S.Invite>
            {selectedOption === 'invite' ? (
              <S.NumberInvites>
                <S.Number>{numberInvites}</S.Number>
              </S.NumberInvites>
            ) : (
              <></>
            )}
          </S.OptionInvite>
        </S.ContainerOptions>
        <S.ScrollView showsVerticalScrollIndicator={false}>
          {showEvent ? (
            <S.ContainerEvent>
              {events.map((event, index) => (
                <React.Fragment key={index}>
                  <CardsEvent
                    adress={event.address}
                    nameEvent={event.name}
                    event="presencial"
                    month={moment(event.date)
                      .locale('pt-br')
                      .format('MMM')
                      .replace(/^\w/, (c) => c.toUpperCase())}
                    day={moment(event.date).format('DD')}
                    date={event.date}
                    descrition={event.description}
                    beginHour={event.beginHour}
                    endHour={event.endHour}
                    invites={event.guests}
                  />
                </React.Fragment>
              ))}
            </S.ContainerEvent>
          ) : (
            <S.ContainerInvite>
              {invites.map((event, index) => (
                <React.Fragment key={index}>
                  <CardsInvite
                    adress={event.address}
                    name={event.name}
                    event="presencial"
                    image={Picture2}
                    date={moment(event.date).format('DD/MM/YYYY')}
                    descrition={event.description}
                    beginHour={event.beginHour}
                    endHour={event.endHour}
                  />
                </React.Fragment>
              ))}
            </S.ContainerInvite>
          )}
        </S.ScrollView>
        <S.IconMore>
          <TouchableOpacity onPress={() => navigation.navigate('SelectGuests')}>
            <S.More source={IconMore} />
          </TouchableOpacity>
        </S.IconMore>
      </S.Body>
    </S.Container>
  );
};

export default MainScreen;
