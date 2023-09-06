import * as S from './styles';
import Calendar from '@components/Calendar';
import CardsEvent from '@components/CardsEvent';
import CardsInvite from '@components/CardsInvite';
import { ModalCalendar } from '@components/ModalCalendar';
import useAuth from '@hooks/useAuth';
import { api } from '@services/api';
import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity } from 'react-native';

const IconProfile = require('../../assets/UserCircle.png');
const IconMore = require('../../assets/IconMore.png');

const Picture2 = require('../../assets/picture2.png');

const MainScreen = ({ navigation }) => {
  const { user } = useAuth();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    getInvites();
  });

  async function getInvites() {
    try {
      const { data } = await api.post('invites/listInvitesByUser', {
        phone: user.phone,
      });
      setInvites(data);
      setNumberInvites(data.length);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }

    try {
      const { data } = await api.post('invites/listEventsByUser', {
        phone: user.phone,
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
    console.log('events');
    setSelectedOption('events');
    setShowEvent(true);
  };

  const handleInvitePress = () => {
    console.log('invite');
    setSelectedOption('invite');
    setShowEvent(false);
  };

  return (
    <S.Container>
      <Modal transparent visible={open}>
        <ModalCalendar setOpen={setOpen} />
      </Modal>
      <S.Header>
        <S.Name>Olá {user.name}!</S.Name>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              'Profile'
              // name: name,
              // imageUser: imageUser,
            );
          }}
        >
          {user.photo ? (
            <S.Icon source={user.photo} />
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
            {numberInvites && (
              <S.NumberInvites>
                <S.Number>{numberInvites}</S.Number>
              </S.NumberInvites>
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
                    navigation={navigation}
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
