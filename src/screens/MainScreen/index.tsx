import * as S from './styles';
import CardsEvent from '@components/CardsEvent';
import CardsInvite from '@components/CardsInvite';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const IconProfile = require('../../assets/UserCircle.png');
const IconMore = require('../../assets/IconMore.png');
const Picture1 = require('../../assets/picture1.png');
const Picture2 = require('../../assets/picture2.png');
const Picture3 = require('../../assets/picture3.png');
const Picture4 = require('../../assets/picture4.png');
const Event1 = require('../../assets/Event1.png');
const Event2 = require('../../assets/Event2.png');

const MainScreen: React.FC = ({ navigation }) => {
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

      while (date.getMonth() == monthIndex) {
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

                console.log(new Date().getDate());

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

  const [selectedOption, setSelectedOption] = useState('invite'); // Inicialmente seleciona o botão de eventos
  const [showEvent, setShowEvent] = useState(false);

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
      <S.Header>
        <S.Name>Olá Rafael!</S.Name>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
          <S.Icon source={IconProfile} />
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
          </S.OptionInvite>
        </S.ContainerOptions>
        <S.ContainerScroll>
          <S.ScrollView showsVerticalScrollIndicator={false}>
            {showEvent ? (
              <S.ContainerEvent>
                <CardsEvent
                  adress="Av. Paulista"
                  name="Marco Rudas"
                  event="presencial"
                  image={Event1}
                />
                <CardsEvent
                  adress="Av. Paulista"
                  name="Marco Rudas"
                  event="presencial"
                  image={Event2}
                />
                <CardsEvent
                  adress="Av. Paulista"
                  name="Beatriz Brum"
                  event="presencial"
                  image={Event1}
                />
                <CardsEvent
                  adress="Av. Paulista"
                  name="Ana Arejano"
                  event="presencial"
                  image={Event2}
                />
                <CardsEvent
                  adress="Av. Paulista"
                  name="Marco Rudas"
                  event="presencial"
                  image={Event1}
                />
                <CardsEvent
                  adress="Av. Paulista"
                  name="Pedro Mendes"
                  event="presencial"
                  image={Event2}
                />
              </S.ContainerEvent>
            ) : (
              <S.ContainerInvite>
                <CardsInvite
                  adress="R. Legal, 123"
                  name="Ana Arejano"
                  event="presencial"
                  image={Picture1}
                  date="01/02/23"
                />
                <CardsInvite
                  adress="Google Meets"
                  name="Beatriz Brum"
                  event="online"
                  image={Picture2}
                  date="02/02/23"
                />
                <CardsInvite
                  adress="Google Meets"
                  name="Pedro Mendes"
                  event="online"
                  image={Picture3}
                  date="03/02/23"
                />
                <CardsInvite
                  adress="Av. Paulista"
                  name="Marco Rudas"
                  event="presencial"
                  image={Picture4}
                  date="04/02/23"
                />
                <CardsInvite
                  adress="Av. Paulista"
                  name="Marco Rudas"
                  event="presencial"
                  image={Picture4}
                  date="04/02/23"
                />
                <CardsInvite
                  adress="Av. Paulista"
                  name="Marco Rudas"
                  event="presencial"
                  image={Picture4}
                  date="04/02/23"
                />
                <CardsInvite
                  adress="Av. Paulista"
                  name="Marco Rudas"
                  event="presencial"
                  image={Picture4}
                  date="04/02/23"
                />
              </S.ContainerInvite>
            )}
          </S.ScrollView>
        </S.ContainerScroll>
        <S.IconMore>
          <TouchableOpacity>
            <S.More source={IconMore} />
          </TouchableOpacity>
        </S.IconMore>
      </S.Body>
    </S.Container>
  );
};

export default MainScreen;
