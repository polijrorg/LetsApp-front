import * as S from './styles';
import React from 'react';

export type CardsEventProps = {
  event: 'online' | 'presencial';
  nameEvent?: string;
  adress?: string;
  date?: string;
  invites?: string;
  confirmed?: string;
  image?: string;
  month?: string;
  day?: string;
  beginHour?: string;
  endHour?: string;
  descrition?: string;
  navigation: any;
};

const CardsEvent: React.FC<CardsEventProps> = ({
  event,
  nameEvent,
  adress,
  date,
  invites,
  confirmed,
  month,
  day,
  beginHour,
  endHour,
  descrition,
  navigation,
}) => {
  const online = require('../../assets/OnlineEvent.png');
  const presencial = require('../../assets/PresencialEvent.png');

  return (
    <S.ContainerCard
      onPress={() => {
        navigation.navigate('ScreenEvent', {
          event: event,
          nameEvent: nameEvent,
          adress: adress,
          date: date,
          invites: invites,
          confirmed: confirmed,
          beginHour: beginHour,
          endHour: endHour,
          descrition: descrition,
        });
      }}
    >
      <S.ContainerContent>
        <S.Image>
          <S.Month>{month}</S.Month>
          <S.Day>{day}</S.Day>
        </S.Image>
        <S.ContainerContentData>
          <S.Name>{nameEvent}</S.Name>
          <S.AddressView>
            <S.IconAdress source={event === 'online' ? online : presencial} />
            <S.Adress>{adress}</S.Adress>
          </S.AddressView>
        </S.ContainerContentData>
      </S.ContainerContent>
    </S.ContainerCard>
  );
};

export default CardsEvent;
