import * as S from './styles';
import Invite from '@interfaces/Invites';
import moment from 'moment';
import React from 'react';

export type CardsInviteProps = {
  location: 'online' | 'presencial';
  invite: Invite;
  navigation: any;
};

const CardsInvite: React.FC<CardsInviteProps> = ({
  location,
  invite,
  navigation,
}) => {
  const online = require('../../assets/OnlineEvent.png');
  const presencial = require('../../assets/PresencialEvent.png');
  const calendar = require('../../assets/CalendarIcon.png');

  return (
    <S.ContainerCard
      onPress={() => {
        navigation.navigate('ScreenInvite', {
          invite: invite,
        });
      }}
    >
      <S.Image source={{ uri: invite.element.organizerPhoto }} />
      <S.InfoWrapper>
        <S.Name>{invite.element.name}</S.Name>
        <S.ContainerContent>
          <S.Icon source={location === 'online' ? online : presencial} />
          <S.Adress>{invite.element.address}</S.Adress>
        </S.ContainerContent>
        <S.ContainerContent>
          <S.Icon source={calendar} />
          <S.Date>{moment(invite.element.begin).format('DD/MM/YYYY')}</S.Date>
        </S.ContainerContent>
      </S.InfoWrapper>
    </S.ContainerCard>
  );
};

export default CardsInvite;
