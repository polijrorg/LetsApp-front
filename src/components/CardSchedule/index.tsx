import * as S from './styles';
import React from 'react';

export type CardScheduleProps = {
  start: string;
  end: string;
  isSelected: boolean;
  onSelect: () => void;
};

const CardSchedule: React.FC<CardScheduleProps> = ({
  start,
  end,
  isSelected,
  onSelect,
}) => {
  const handleClick = () => {
    // setTimeSelectedStart(scheduleStart);
    // setTimeSelectedEnd(scheduleEnd);

    onSelect();
  };

  return (
    <S.ContainerCard onPress={handleClick} isSelected={!isSelected}>
      <S.Schedule>{start}</S.Schedule>
      <S.Schedule>às</S.Schedule>
      <S.Schedule>{end}</S.Schedule>
    </S.ContainerCard>
  );
};

export default CardSchedule;
