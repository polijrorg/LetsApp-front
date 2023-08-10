import * as S from './styles';
import React, { useState } from 'react';

export type CardScheduleProps = {
  day: string;
  date: string;
  start: string;
  end: string;
  onClick?: () => void;
};

const CardSchedule: React.FC<CardScheduleProps> = ({
  day,
  date,
  start,
  end,
  onClick,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (isSelected === false) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };

  return (
    <S.ContainerCard
      onPress={handleClick}
      onClick={onClick}
      isSelected={isSelected}
    >
      <S.Day>{date}</S.Day>
      <S.Date>{day}</S.Date>
      <S.Schedule>
        {start} às {end}{' '}
      </S.Schedule>
    </S.ContainerCard>
  );
};

export default CardSchedule;
