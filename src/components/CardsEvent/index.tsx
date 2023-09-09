import * as S from './styles';
import Event from '@interfaces/Events';
import moment from 'moment';
import React from 'react';

export type CardsEventProps = {
  location: 'online' | 'presencial';
  event: Event;
  navigation: any;
};

const CardsEvent: React.FC<CardsEventProps> = ({
  location,
  event,
  navigation,
}) => {
  const online = require('../../assets/OnlineEvent.png');
  const presencial = require('../../assets/PresencialEvent.png');
  console.log(
    moment(event.begin)
      .locale('pt-br')
      .format('MMM')
      .replace(/^\w/, (c) => c.toUpperCase())
  );
  console.log(event.begin);

  return (
    <S.ContainerCard
      onPress={() => {
        navigation.navigate('ScreenEvent', {
          event: event,
          location: location,
        });
      }}
    >
      <S.ContainerContent>
        <S.Image>
          <S.Month>
            {moment(event.begin)
              .locale('pt-br')
              .format('MMM')
              .replace(/^\w/, (c) => c.toUpperCase())}
          </S.Month>
          <S.Day>{moment(event.begin).format('DD')}</S.Day>
        </S.Image>
        <S.ContainerContentData>
          <S.Name>{event.name}</S.Name>
          <S.ContainerContent>
            <S.IconAdress
              source={location === 'online' ? online : presencial}
            />
            <S.Adress>{event.address}</S.Adress>
          </S.ContainerContent>
        </S.ContainerContentData>
      </S.ContainerContent>
    </S.ContainerCard>
  );
};

export default CardsEvent;
