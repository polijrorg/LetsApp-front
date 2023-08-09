import * as S from './styles';
import CardsEvent from '@components/CardsEvent';
import CardsInvite from '@components/CardsInvite';
import { Descrtion } from '@components/Modal/styles';
import { api } from '@services/api';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { ProfileContext } from 'src/contexts/ProfileContext';

const IconProfile = require('../../assets/UserCircle.png');
const IconMore = require('../../assets/IconMore.png');
const Picture1 = require('../../assets/picture1.png');
const Picture2 = require('../../assets/picture2.png');
const Picture3 = require('../../assets/picture3.png');
const Picture4 = require('../../assets/picture4.png');
const Event1 = require('../../assets/Event1.png');
const Event2 = require('../../assets/Event2.png');

const events = [
  {
    kind: 'calendar#events',
    defaultReminders: [
      {
        minutes: 30,
        method: 'popup',
      },
    ],
    items: [
      {
        status: 'confirmed',
        kind: 'calendar#event',
        end: {
          timeZone: 'America/Sao_Paulo',
          dateTime: '2022-09-13T09:00:00-03:00',
        },
        description: '12554967',
        created: '2022-09-10T14:58:27.000Z',
        iCalUID: '3sim7hm73crai5mt4ee7ajdfd0@google.com',
        reminders: {
          useDefault: true,
        },
        htmlLink:
          'https://www.google.com/calendar/event?eid=M3NpbTdobTczY3JhaTVtdDRlZTdhamRmZDAgY2Fpb2dpcm8xMEBt',
        sequence: 1,
        updated: '2022-09-12T19:11:43.336Z',
        summary: 'Entrevista PS 2022.2',
        start: {
          timeZone: 'America/Sao_Paulo',
          dateTime: '2022-09-13T08:00:00-03:00',
        },
        etag: '"3326019806672000"',
        conferenceData: {
          entryPoints: [
            {
              entryPointType: 'video',
              uri: 'https://meet.google.com/pds-bdbe-nje',
              label: 'meet.google.com/pds-bdbe-nje',
            },
            {
              entryPointType: 'more',
              uri: 'https://tel.meet/pds-bdbe-nje?pin=5303762552677',
              pin: '5303762552677',
            },
            {
              entryPointType: 'phone',
              regionCode: 'BR',
              uri: 'tel:+55-11-4935-0167',
              pin: '984015913',
              label: '+55 11 4935-0167',
            },
          ],
          conferenceSolution: {
            iconUri:
              'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png',
            name: 'Google Meet',
            key: {
              type: 'hangoutsMeet',
            },
          },
          conferenceId: 'pds-bdbe-nje',
        },
        eventType: 'default',
        attendees: [
          {
            organizer: true,
            email: 'processo.seletivo@polijunior.com.br',
            responseStatus: 'accepted',
          },
          {
            self: true,
            email: 'caiogiro10@gmail.com',
            responseStatus: 'needsAction',
          },
          {
            email: 'felipe.muralha@polijunior.com.br',
            responseStatus: 'accepted',
          },
          {
            email: 'arthur.maia@polijunior.com.br',
            responseStatus: 'accepted',
          },
        ],
        organizer: {
          email: 'processo.seletivo@polijunior.com.br',
        },
        creator: {
          email: 'processo.seletivo@polijunior.com.br',
        },
        id: '3sim7hm73crai5mt4ee7ajdfd0',
        hangoutLink: 'https://meet.google.com/pds-bdbe-nje',
      },
      {
        status: 'confirmed',
        kind: 'calendar#event',
        end: {
          timeZone: 'America/Araguaina',
          dateTime: '2022-09-14T16:00:00-03:00',
        },
        description:
          'Ol\u00e1, Cain\u00e3. Tudo bem?\n\n\n\nConforme conversamos, este \u00e9 o nosso convite para a entrevista.\n\n\n\nO seu bate-papo est\u00e1 agendado para o dia 14/09/22 \u00e0s 15:00 hor\u00e1rio de Bras\u00edlia.\n\n\n\nTemos algumas dicas para voc\u00ea se planejar:\n\n\n\n*   Reserve 60 min do seu tempo para a conversa.\n\n*   Esteja preparado para responder algumas quest\u00f5es t\u00e9cnicas e pr\u00e1ticas sobre a sua carreira.\n\n*   Aproveite o momento da entrevista para tirar todas as suas d\u00favidas.\n\n\nObs: A entrevista ser\u00e1 realizada de maneira presencial, na Escola Polit\u00e9cnica da USP - Biblioteca do pr\u00e9dio da Eng. El\u00e9trica.\n\n\n[assinatura]\n\n\n\n\nEsta mensagem pode conter informa\u00e7\u00e3o confidencial ou privilegiada e seu sigilo \u00e9 protegido por lei. Se voc\u00ea n\u00e3o for o destinat\u00e1rio ou a pessoa autorizada a receber esta mensagem, voc\u00ea n\u00e3o deve usar, copiar, divulgar ou tomar qualquer a\u00e7\u00e3o baseada nas informa\u00e7\u00f5es contidas aqui. Se voc\u00ea recebeu esta mensagem por engano, por favor, avise o remetente imediatamente respondendo o e-mail e em seguida delete-o. Agradecemos sua coopera\u00e7\u00e3o.\n\nThis message may contain confidential or privileged information and its confidentiality is protected by law. If you are not the addressed or authorized person to receive this message, you must not use, copy, disclose or take any action based on it or any information herein. If you have received this message by mistake, please advise the sender immediately by replying the e-mail and then deleting it. Thank you for your cooperation.\n',
        created: '2022-09-14T13:32:08.000Z',
        iCalUID:
          '040000008200E00074C5B7101A82E00800000000B0A16BC624C8D8010000000000000000100000009CAEFE676F056046B723086483998DC6',
        reminders: {
          useDefault: true,
        },
        htmlLink:
          'https://www.google.com/calendar/event?eid=XzYwcTMwYzFnNjBvMzBlMWk2MG80YWMxZzYwcmo4Z3BsODhyajJjMWg4NHMzNGg5ZzYwczMwYzFnNjBvMzBjMWc4OG80MmM5bTg5MWpjY2hrOGNzNDhlMWc2NG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMmMxZzYwbzMwYzFnNzUxazJoYTY4a3IzZWRpNjYwcWpjYzFrNnAxM2VjaGo2MHMzY2QxbzZjc2ppZTI0OGNyMCBjYWlvZ2lybzEwQG0',
        sequence: 0,
        updated: '2022-09-14T13:32:16.963Z',
        summary:
          'Cain\u00e3 Silveira - Est\u00e1gio em Desenvolvimento de SW para Desktop (C#)',
        guestsCanInviteOthers: false,
        start: {
          timeZone: 'America/Araguaina',
          dateTime: '2022-09-14T15:00:00-03:00',
        },
        etag: '"3326324673926000"',
        privateCopy: true,
        eventType: 'default',
        attendees: [
          {
            displayName: 'Adnan Tavares Anholetto',
            email: 'adnan.t@sidi.org.br',
            responseStatus: 'needsAction',
          },
          {
            displayName: 'Celia Regina Mazzetto',
            email: 'c.mazzetto@sidi.org.br',
            responseStatus: 'needsAction',
          },
          {
            displayName: 'Carlos Eduardo Pavarina',
            email: 'c.pavarina@sidi.org.br',
            responseStatus: 'needsAction',
          },
          {
            self: true,
            email: 'caiogiro10@gmail.com',
            responseStatus: 'needsAction',
          },
        ],
        organizer: {
          displayName: 'Adrielli Leme Batista',
          email: 'adrielli.b@sidi.org.br',
        },
        creator: {
          self: true,
          email: 'caiogiro10@gmail.com',
        },
        id: '_60q30c1g60o30e1i60o4ac1g60rj8gpl88rj2c1h84s34h9g60s30c1g60o30c1g88o42c9m891jcchk8cs48e1g64o30c1g60o30c1g60o30c1g60o32c1g60o30c1g751k2ha68kr3edi660qjcc1k6p13echj60s3cd1o6csjie248cr0',
        attachments: [
          {
            fileUrl:
              'https://mail.google.com/?view=att&th=1833c33386a47715&attid=0.1&disp=attd&zw',
            iconLink: '',
            title: 'image001.png',
          },
          {
            fileUrl:
              'https://mail.google.com/?view=att&th=1833c33386a47715&attid=0.2&disp=attd&zw',
            iconLink: '',
            title: 'image002.png',
          },
          {
            fileUrl:
              'https://mail.google.com/?view=att&th=1833c33386a47715&attid=0.3&disp=attd&zw',
            iconLink: '',
            title: 'image001.png',
          },
        ],
      },
    ],
  },
];

const MainScreen: React.FC = ({ navigation }) => {
  // const { name, imageUser } = route.params;
  // const appNavigation = useNavigation<AppNavigatorRoutesProps>();

  const { nameUser, imageOfUser, phoneUser } = useContext(ProfileContext);

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
  }, []);

  async function getInvites() {
    try {
      const { data } = await api.post('invites/listInvitesByUser', {
        phone: phoneUser,
      });
      setInvites(data);
      setNumberInvites(data.length);
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    try {
      const { data } = await api.post('invites/listEventsByUser', {
        phone: phoneUser,
      });
      setEvents(data);
      console.log(data);
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
