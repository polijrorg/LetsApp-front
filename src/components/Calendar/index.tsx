import CalendarDay from './CalendarDay';
import * as S from './styles';
import useAuth from '@hooks/useAuth';
import CalendarServices from '@services/CalendarServices';
import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useEffect, useState } from 'react';

export type Props = {};

function formatNumber(number: number) {
  const formattedNumber = number < 10 ? `0${number}` : `${number}`;

  return formattedNumber;
}

const Calendar: React.FC<Props> = ({}) => {
  const [days, setDays] = useState({});
  const { user } = useAuth();
  const [week, setWeek] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  useEffect(() => {
    const getEventsInWeek = async () => {
      const response = await CalendarServices.getEventsInWeek(user.phone);
      let weekEvents = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      };
      response.map((event) => {
        weekEvents[moment(event.begin).day()] = true;
      });
      setWeek(weekEvents);
    };
    getEventsInWeek();
  }, [user.phone]);

  useEffect(() => {
    const getDays = async () => {
      const daysOfWeek = {};

      const today = moment();
      daysOfWeek[today.isoWeekday()] = today.date();

      // get days after today
      for (let index = today.isoWeekday() + 1; index <= 5; index++) {
        const daysAfter = index - today.isoWeekday();
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
      <CalendarDay
        selected={week[1]}
        weekday="Seg"
        day={formatNumber(days[1])}
      />
      <CalendarDay
        selected={week[2]}
        weekday="Ter"
        day={formatNumber(days[2])}
      />
      <CalendarDay
        selected={week[3]}
        weekday="Qua"
        day={formatNumber(days[3])}
      />
      <CalendarDay
        selected={week[4]}
        weekday="Qui"
        day={formatNumber(days[4])}
      />
      <CalendarDay
        selected={week[5]}
        weekday="Sex"
        day={formatNumber(days[5])}
      />
    </S.Wrapper>
  );
};

export default Calendar;
