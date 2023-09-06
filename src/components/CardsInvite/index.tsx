import * as S from './styles';
import moment from 'moment';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export type CardsInviteProps = {
  event: 'online' | 'presencial';
  name: string;
  organizerPhoto: string;
  adress: string;
  begin?: Date;
  end?: Date;
  descrition?: string;
  navigation: any;
  organizerName: string;
};

const CardsInvite: React.FC<CardsInviteProps> = ({
  event,
  name,
  organizerPhoto,
  adress,
  begin,
  end,
  descrition,
  navigation,
  organizerName,
}) => {
  const online = require('../../assets/OnlineEvent.png');
  const presencial = require('../../assets/PresencialEvent.png');
  const calendar = require('../../assets/CalendarIcon.png');

  return (
    <S.ContainerCard>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('ScreenInvite', {
            name: name,
            organizerPhoto: organizerPhoto,
            adress: adress,
            descrition: descrition,
          });
        }}
      > */}
      <S.Image source={{ uri: organizerPhoto }} />
      <S.InfoWrapper>
        <S.Name>{name}</S.Name>
        <S.ContainerContent>
          <S.Icon source={event === 'online' ? online : presencial} />
          <S.Adress>{adress}</S.Adress>
        </S.ContainerContent>
        <S.ContainerContent>
          <S.Icon source={calendar} />
          <S.Date>{moment(begin).format('DD/MM/YYYY')}</S.Date>
        </S.ContainerContent>
      </S.InfoWrapper>
      {/* </TouchableOpacity> */}
    </S.ContainerCard>
  );
};

export default CardsInvite;
