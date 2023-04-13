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
    <S.Body>
      <StatusBar hidden={true} />
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
  );
};

export default MainScreen;
