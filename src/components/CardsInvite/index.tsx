import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/PublicRoutes';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export type CardsInviteProps = {
  event: 'online' | 'presencial';
  name: string;
  image: string;
  adress: string;
  date?: string;
  descrition?: string;
  beginHour?: string;
  endHour?: string;
};

const CardsInvite: React.FC<CardsInviteProps> = ({
  event,
  name,
  image,
  adress,
  date,
  descrition,
  beginHour,
  endHour,
}) => {
  const appNavigation = useNavigation<AppNavigatorRoutesProps>();
  const online = require('../../assets/OnlineEvent.png');
  const presencial = require('../../assets/PresencialEvent.png');
  const calendar = require('../../assets/CalendarIcon.png');

  return (
    <S.ContainerCard>
      <TouchableOpacity
        onPress={() => {
          appNavigation.navigate('ScreenInvite', {
            name: name,
            image: image,
            adress: adress,
            date: date,
            descrition: descrition,
            beginHour: beginHour,
            endHour: endHour,
          });
        }}
      >
        <S.ContainerContent>
          <S.Image source={image} />
          <S.ContainerContentData>
            <S.Name>{name}</S.Name>
            <S.ContainerContent>
              <S.IconAdress source={event === 'online' ? online : presencial} />
              <S.Adress>{adress}</S.Adress>
            </S.ContainerContent>
            <S.ContainerContent>
              <S.IconDate source={calendar} />
              <S.Date>{date}</S.Date>
            </S.ContainerContent>
          </S.ContainerContentData>
        </S.ContainerContent>
      </TouchableOpacity>
    </S.ContainerCard>
  );
};

export default CardsInvite;
