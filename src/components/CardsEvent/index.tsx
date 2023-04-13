import * as S from './styles';
import React from 'react';

export type CardsEventProps = {
  event: 'online' | 'presencial';
  name: string;
  image: string;
  adress: string;
};

const CardsEvent: React.FC<CardsEventProps> = ({
  event,
  name,
  image,
  adress,
}) => {
  const online = require('../../assets/OnlineEvent.png');
  const presencial = require('../../assets/PresencialEvent.png');

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
        </S.ContainerContentData>
      </S.ContainerContent>
    </S.ContainerCard>
  );
};

export default CardsEvent;
