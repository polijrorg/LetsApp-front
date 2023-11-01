import * as S from './styles';
import React from 'react';

export type Props = {
  selected?: boolean;
  weekday: string;
  day: string;
};

const CalendarDay: React.FC<Props> = ({ selected, weekday, day }) => {
  return (
    <S.DayWrapper selected={selected}>
      <S.WeekText>{weekday}</S.WeekText>
      <S.DayText>{day}</S.DayText>
    </S.DayWrapper>
  );
};

export default CalendarDay;
