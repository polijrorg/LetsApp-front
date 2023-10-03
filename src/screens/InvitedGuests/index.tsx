import * as S from './styles';
import Contact from '@components/Contact';
import Event from '@interfaces/Events';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const IconArrow = require('../../assets/ArrowBackBlack.png');

const InvitedGuests = ({ navigation, route }) => {
  const event: Event = route.params.event;

  return (
    <S.MainWrapper>
      <S.Body>
        <S.Header>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ScreenEvent', { event });
            }}
          >
            <S.IconBack source={IconArrow} />
          </TouchableOpacity>
          <S.Title>Convidados</S.Title>
        </S.Header>
        <S.Scroll>
          <S.ContainerSubtitle>
            <S.Subtitle>Aceitaram</S.Subtitle>
          </S.ContainerSubtitle>
          <Contact
            name="teste"
            phoneOrEmail="+55 (11) 999999999"
            isDisabled={true}
          />
          <S.ContainerSubtitle>
            <S.Subtitle>Pendentes</S.Subtitle>
          </S.ContainerSubtitle>
          <Contact
            name="teste"
            phoneOrEmail="+55 (11) 999999999"
            isDisabled={true}
          />
          <Contact
            name="teste"
            phoneOrEmail="+55 (11) 999999999"
            isDisabled={true}
          />
          <S.ContainerSubtitle>
            <S.Subtitle>Recusaram</S.Subtitle>
          </S.ContainerSubtitle>
          <Contact
            name="teste"
            phoneOrEmail="+55 (11) 999999999"
            isDisabled={true}
          />
          <Contact
            name="teste"
            phoneOrEmail="+55 (11) 999999999"
            isDisabled={true}
          />
          <Contact
            name="teste"
            phoneOrEmail="+55 (11) 999999999"
            isDisabled={true}
          />
        </S.Scroll>
      </S.Body>
    </S.MainWrapper>
  );
};

export default InvitedGuests;
