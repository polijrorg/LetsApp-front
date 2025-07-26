import { AuthenticationModal } from '@components/AuthenticationModal';
import * as S from './styles';
import Calendar from '@components/Calendar';
import CardsEvent from '@components/CardsEvent';
import CardsInvite from '@components/CardsInvite';
import { ModalCalendar } from '@components/ModalCalendar';
import useAuth from '@hooks/useAuth';
import CompleteUser from '@interfaces/CompleteUser';
import Invite from '@interfaces/Invites';
import { useIsFocused } from '@react-navigation/native';
import CalendarServices from '@services/CalendarServices';
import { api } from '@services/api';
import 'moment/locale/pt-br';
import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { google, calendar_v3 } from 'googleapis';


type GoogleEvent = calendar_v3.Schema$Event;
const IconProfile = require('../../assets/UserCircle.png');
const IconMore = require('../../assets/IconMore.png');

const MainScreen = ({ navigation }) => {
  const { user, deleteAsyncStorage, updateUser } = useAuth();

  const [open, setOpen] = useState(true);
  const [completeUser, setCompleteUser] = useState<CompleteUser>(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`GetUserByPhone/${user?.phone}`);
        // console.log(`MainScreen 33 ${JSON.stringify(response.data)}`)
        setCompleteUser(response.data);
        setOpen(!response.data.calendar_found);      
        // console.log(`MainScreen 33 ${JSON.stringify(response.data.calendar_found)}`)

      } catch (error) {
        console.log(error);
        if (error.response.data.message === 'User Not Found') {
          deleteAsyncStorage();
        }
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isFocused]);

  useEffect(() => {
    const getInvites = async () => {
      try {
        // console.log('MainScreen 45 completeUser: Invites', completeUser);

        // if (completeUser !== null) {
        //   const response = await CalendarServices.getGoogleEvents(
        //     completeUser.user?.email
        //   );
        //   console.log(`MainScreen 53 Invites: ${JSON.stringify(response)}`)

        //   setInvites(response);
        //   setNumberInvites(response.length);
        // }
      } catch (error) {
        console.log(error);
      }
    };
    user?.email && getInvites();
  }, [completeUser, user?.email]);

  useEffect(() => {
    // console.log('MainScreen 68 completeUser: Events', completeUser);

    user?.email && getEvents();
  }, [completeUser, user?.email]);
  useEffect(() => {
    const getURL = async () => {
      try {
        if (completeUser.calendar_found ) { 
          console.log('🔵 type', completeUser.user.type);
          if (completeUser.user.type === 'GOOGLE' && completeUser.user.email) {
            const authUrl = await CalendarServices.getGoogleUrl(user?.phone);
            console.log('🔵 URL de autenticação do Google:', authUrl);
          }
          if (completeUser.user.type === 'OUTLOOK' && completeUser.user.email) {
            const authUrl = await CalendarServices.getOutlookUrl(user?.phone);
            console.log('🔵 URL de autenticação do Outlook:', authUrl);          
          } 
        }
        await updateUser();
        // console.log(`MainScreen 33 calendarFound ${JSON.stringify(response.data.calendar_found)}`)

      } catch (error) {
        console.log(error);
        if (error.response.data.message === 'User Not Found') {
          deleteAsyncStorage();
        }
      }
    };
    getURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const [selectedOption, setSelectedOption] = useState('invite'); // Inicialmente seleciona o botão de eventos
  const [showEvent, setShowEvent] = useState(false);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [events, setEvents] = useState<GoogleEvent[]>([]);
  const [numberInvites, setNumberInvites] = useState<number>(null);
    const getEvents = async () => {
      try {
        if (completeUser !== null) {
          const response = await CalendarServices.getUserEvents(
            completeUser.user?.email
          );
          // console.log(`MainScreen 68 Events: ${JSON.stringify(response)}`)
          setEvents(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
  const handleEventsPress = () => {
    console.log('🔥 CLICOU EM EVENTOS');
    getEvents();
    setSelectedOption('events');
    setShowEvent(true);
  };

  const handleInvitePress = () => {
      console.log('🔥 CLICOU EM EVENTOS');
    setSelectedOption('invite');
    setShowEvent(false);
  };

  return (
    <S.Container>
        <AuthenticationModal
          visible={open} 
           onClose={function (): void {
            console.log('🔴 Fechando modal');
            setOpen(false);
          // throw new Error('Function not implemented.');
        } } onSuccess={function (provider: 'google' | 'outlook'): void {
            console.log('🟢 Sucesso na autenticação:', provider);
            setOpen(false);
          // throw new Error('Function not implemented.');
        } } userPhone={user?.phone} />
      <S.Header>
        <S.Name>Olá {user?.name}!</S.Name>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile', {
              name: user?.name,
              imageUser: user?.photo,
              email: completeUser?.user?.email,
              phone: user?.phone,
            });
          }}
        >
          {user?.photo ? (
            <S.Icon source={{ uri: user.photo }} />
          ) : (
            <S.Icon source={IconProfile} />
          )}
        </TouchableOpacity>
      </S.Header>
      <Calendar />
      <S.Body>
        <S.ContainerOptions>
          <S.OptionEvents onPress={handleEventsPress} Option={selectedOption}>
            <S.Events Option={selectedOption}>Eventos</S.Events>
          </S.OptionEvents>
          <S.OptionInvite onPress={handleInvitePress} Option={selectedOption}>
            <S.Invite Option={selectedOption}>Convites</S.Invite>
            {numberInvites ? (
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
              {events.length === 0 && (
                <S.EmptyText>
                  ⚠️ Clique no ícone de + para criar seu primeiro evento ou
                  aceite um convite!
                </S.EmptyText>
              )}
              {events.map((event, index) => (
                <React.Fragment key={index}>
                  <CardsEvent
                    key={event.id}
                    event={event}
                    navigation={navigation}
                  />
                </React.Fragment>
              ))}
            </S.ContainerEvent>
          ) : (
            <S.ContainerInvite>
              {invites.length === 0 && (
                <S.EmptyText>
                  ⚠️ Você ainda não foi convidado para nenhum evento!
                </S.EmptyText>
              )}

              {invites.map((invite, index) => (
                <React.Fragment key={index}>
                  <CardsInvite
                    key={invite.id}
                    invite={invite}
                    navigation={navigation}
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
