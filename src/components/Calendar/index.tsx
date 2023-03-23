import * as S from './styles';
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from 'date-fns';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { WeekCalendar } from 'react-native-calendars';
import PagerView from 'react-native-pager-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 14),
    end: addDays(new Date(), 14),
  },
  { weekStartsOn: 1 }
).reduce((acc: Date[][], cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 5),
  });

  acc.push(allDays);

  return acc;
}, []);

const MyCalendar = () => {
  return (
    <PagerView style={styles.container}>
      {dates.map((week, i) => {
        return (
          <View key={i}>
            <S.containerCalendar>
              {week.map((day) => {
                const txt = format(day, 'EEEEE');
                return (
                  <S.Day key={day.toString()}>
                    <Text>{txt}</Text>
                    <Text>{day.getDate()}</Text>
                  </S.Day>
                );
              })}
            </S.containerCalendar>
          </View>
        );
      })}
    </PagerView>
  );
};

export default MyCalendar;
