import * as S from './styles';
import Event from '@interfaces/Events';
import moment from 'moment';
import React from 'react';
import { google, calendar_v3 } from 'googleapis';


type GoogleEvent = calendar_v3.Schema$Event;;

export type CardsEventProps = {
  event: GoogleEvent;
  navigation: any;
};

const CardsEvent: React.FC<CardsEventProps> = ({ event, navigation }) => {
  const online = require('../../assets/OnlineEvent.png');
  const presencial = require('../../assets/PresencialEvent.png');

  return (
    <S.ContainerCard
      onPress={() => {
        navigation.navigate('ScreenEvent', {
          event: event,
        });
      }}
    >
      <S.ContainerContent>
        <S.Image>
          <S.Month>
            {moment(event?.start?.dateTime)
              .locale('pt-br')
              .format('MMM')
              .replace(/^\w/, (c) => c.toUpperCase())}
          </S.Month>
          <S.Day>{moment(event?.start?.dateTime).format('DD')}</S.Day>
        </S.Image>
        <S.ContainerContentData>
          <S.Name>{event.summary}</S.Name>
          <S.ContainerContent>
            <S.IconAdress
              source={event?.location ? presencial : online}
            />
            <S.Adress>{event?.location || 'Evento online'}</S.Adress>
          </S.ContainerContent>
        </S.ContainerContentData>
      </S.ContainerContent>
    </S.ContainerCard>
  );
};

export default CardsEvent;
