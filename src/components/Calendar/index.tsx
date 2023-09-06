import CalendarDay from './CalendarDay';
import * as S from './styles';
import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useEffect, useState } from 'react';

export type Props = {
  width: string;
  hasIcon: boolean;
  icon?: string;
  backgroundColor: string;
  title: string;
  titleColor: string;
  borderColor: string;
};

function formatNumber(number: number) {
  const formattedNumber = number < 10 ? `0${number}` : `${number}`;

  return formattedNumber;
}

const Calendar: React.FC<Props> = ({}) => {
  const [days, setDays] = useState({});

  useEffect(() => {
    const getDays = async () => {
      const daysOfWeek = {};

      const today = moment();
      daysOfWeek[today.isoWeekday()] = today.date();

      // get days after today
      for (let index = today.isoWeekday() + 1; index <= 5; index++) {
        // console.log(index); 3 4 5
        const daysAfter = index - today.isoWeekday();
        // console.log(daysAfter);
        const day = today.add(daysAfter, 'days');
        daysOfWeek[day.isoWeekday()] = day.date();
      }

      // get days before today 1
      for (let index = today.isoWeekday() - 1; index > 0; index--) {
        const daysBefore = today.isoWeekday() - index;
        const day = today.subtract(daysBefore, 'days');
        daysOfWeek[day.isoWeekday()] = day.date();
      }

      setDays(daysOfWeek);
    };
    getDays();
  }, []);
  return (
    <S.Wrapper>
      <CalendarDay selected weekday="Seg" day={formatNumber(days[1])} />
      <CalendarDay weekday="Ter" day={formatNumber(days[2])} />
      <CalendarDay weekday="Qua" day={formatNumber(days[3])} />
      <CalendarDay weekday="Qui" day={formatNumber(days[4])} />
      <CalendarDay weekday="Sex" day={formatNumber(days[5])} />
    </S.Wrapper>
  );
};

export default Calendar;
