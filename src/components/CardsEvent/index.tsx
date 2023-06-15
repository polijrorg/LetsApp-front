import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/PublicRoutes';
import React from 'react';

export type CardsEventProps = {
  event: 'online' | 'presencial';
  nameEvent?: string;
  adress?: string;
  date?: string;
  schedule?: string;
  invites?: string;
  confirmed?: string;
  image?: string;
};

const CardsEvent: React.FC<CardsEventProps> = ({
  event,
  nameEvent,
  adress,
  date,
  schedule,
  invites,
  confirmed,
  image,
}) => {
  const appNavigation = useNavigation<AppNavigatorRoutesProps>();
  const online = require('../../assets/OnlineEvent.png');
  const presencial = require('../../assets/PresencialEvent.png');

  return (
    <S.ContainerCard
      onPress={() => {
        appNavigation.navigate('ScreenEvent', {
          event: event,
          nameEvent: nameEvent,
          adress: adress,
          date: date,
          schedule: schedule,
          invites: invites,
          confirmed: confirmed,
        });
      }}
    >
      <S.ContainerContent>
        <S.Image source={image} />
        <S.ContainerContentData>
          <S.Name>{nameEvent}</S.Name>
          <S.ContainerContent>
            <S.IconAdress source={event === 'online' ? online : presencial} />
            <S.Adress>{adress}</S.Adress>
          </S.ContainerContent>
        </S.ContainerContentData>
      </S.ContainerContent>
    </S.ContainerCard>
  );
};

export default CardsEvent;
