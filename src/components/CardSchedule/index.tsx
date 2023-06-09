import * as S from './styles';
import React, { useState } from 'react';

export type CardScheduleProps = {
  day: string;
  date: string;
  schedule: string;
};

const CardSchedule: React.FC<CardScheduleProps> = ({ day, date, schedule }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (isSelected === false) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };

  return (
    <S.ContainerCard onPress={handleClick} isSelected={isSelected}>
      <S.Day>{day}</S.Day>
      <S.Date>{date}</S.Date>
      <S.Schedule>{schedule}</S.Schedule>
    </S.ContainerCard>
  );
};

export default CardSchedule;
