import * as S from './styles';
import Calendar from '@components/Calendar';
import CardsEvent from '@components/CardsEvent';
import CardsInvite from '@components/CardsInvite';
import { ModalCalendar } from '@components/ModalCalendar';
import useAuth from '@hooks/useAuth';
import CompleteUser from '@interfaces/CompleteUser';
import Event from '@interfaces/Events';
import Invite from '@interfaces/Invites';
import { useIsFocused } from '@react-navigation/native';
import CalendarServices from '@services/CalendarServices';
import { api } from '@services/api';
import 'moment/locale/pt-br';
import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity } from 'react-native';

const IconProfile = require('../../assets/UserCircle.png');
const IconMore = require('../../assets/IconMore.png');

const MainScreen = ({ navigation }) => {
  const { user, deleteAsyncStorage } = useAuth();

  const [open, setOpen] = useState(true);
  const [completeUser, setCompleteUser] = useState<CompleteUser>(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`GetUserByPhone/${user.phone}`);
        setCompleteUser(response.data);
        setOpen(!response.data.calendar_found);
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
        if (completeUser !== null) {
          const response = await CalendarServices.getUserInvites(
            completeUser.user?.email
          );
          setInvites(response);
          setNumberInvites(response.length);
        }
      } catch (error) {
        console.log(error);
      }
    };
    user?.email && getInvites();
  }, [completeUser, user?.email]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        if (completeUser !== null) {
          const response = await CalendarServices.getUserEvents(
            completeUser.user?.email
          );
          setEvents(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    user?.email && getEvents();
  }, [completeUser, user?.email]);

  const [selectedOption, setSelectedOption] = useState('invite'); // Inicialmente seleciona o botão de eventos
  const [showEvent, setShowEvent] = useState(false);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [numberInvites, setNumberInvites] = useState<number>(null);

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
      <Modal transparent visible={open}>
        <ModalCalendar />
      </Modal>
      <S.Header>
        <S.Name>Olá {user?.name}!</S.Name>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile', {
              name: user?.name,
              imageUser: user?.photo,
              email: completeUser?.user?.email,
              phone: user.phone,
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
                    key={event.element.id}
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
                    key={invite.element.id}
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
