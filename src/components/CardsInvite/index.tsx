import * as S from './styles';
import React from 'react';

export type CardsInviteProps = {
  event: 'online' | 'presencial';
  name: string;
  image: string;
  adress: string;
  date?: string;
};

const CardsInvite: React.FC<CardsInviteProps> = ({
  event,
  name,
  image,
  adress,
  date,
}) => {
  const online = require('../../assets/OnlineEvent.png');
  const presencial = require('../../assets/PresencialEvent.png');
  const calendar = require('../../assets/CalendarIcon.png');

  return (
    <S.ContainerCard>
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
    </S.ContainerCard>
  );
};

export default CardsInvite;
