import * as S from './styles';
import React, { useState, useContext } from 'react';
import { ProfileContext } from 'src/contexts/useProfile';

export type CardScheduleProps = {
  day: string;
  date: string;
  start: string;
  end: string;
  scheduleStart: string;
  scheduleEnd: string;
  isSelected: boolean;
  onSelect: () => void;
};

const CardSchedule: React.FC<CardScheduleProps> = ({
  day,
  date,
  start,
  end,
  scheduleStart,
  scheduleEnd,
  isSelected,
  onSelect,
}) => {
  const { setTimeSelectedStart, setTimeSelectedEnd } =
    useContext(ProfileContext);

  const handleClick = () => {
    setTimeSelectedStart(scheduleStart);
    setTimeSelectedEnd(scheduleEnd);

    if (onSelect) {
      onSelect();
    }
  };

  return (
    <S.ContainerCard onPress={handleClick} isSelected={isSelected}>
      <S.Day>{date}</S.Day>
      <S.Date>{day}</S.Date>
      <S.Schedule>
        {start} às {end}{' '}
      </S.Schedule>
    </S.ContainerCard>
  );
};

export default CardSchedule;
