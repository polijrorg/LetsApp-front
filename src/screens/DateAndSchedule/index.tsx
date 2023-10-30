import * as S from './styles';
import Button from '@components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import moment from 'moment-timezone';
import React, { useState } from 'react';
import {
  Pressable,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import useProfile from 'src/contexts/useProfile';

const styles = StyleSheet.create({
  datePicker: {
    height: 150,
  },
});

const DateAndSchedule = ({ navigation, route }) => {
  const IconClock = require('../../assets/ClockIcon.png');
  const IconDate = require('../../assets/DateIcon.png');

  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showTimeStart, setShowTimeStart] = useState(false);
  const [showTimeEnd, setShowTimeEnd] = useState(false);
  const [time, setTime] = useState(new Date());
  const [time1, setTime1] = useState(new Date());
  const [durations, setDurations] = useState('');

  const { setDateStart, setDateEnd, setTimeStart, setTimeEnd, setDuration } =
    useProfile();

  const { mandatoryContactSelected, contactSelected } = route.params;

  const sendData = () => {
    setDateStart(
      moment(date)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .tz('America/Sao_Paulo')
        .format()
    );
    setDateEnd(
      moment(date)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .tz('America/Sao_Paulo')
        .format()
    );
    setTimeStart(moment(time).tz('America/Sao_Paulo').format('HH:mm:ss'));
    setTimeEnd(moment(time1).tz('America/Sao_Paulo').format('HH:mm:ss'));
    setDuration(moment.duration(durations.concat(':00')).asMinutes());
  };

  const { duration } = useProfile();
  console.log(duration);

  const toggleStartPicker = () => {
    setShowStartPicker(!showStartPicker);
  };

  const toggleEndPicker = () => {
    setShowEndPicker(!showEndPicker);
  };

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    if (Platform.OS === 'android') {
      toggleStartPicker();
    }
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setDate1(currentDate);

    if (Platform.OS === 'android') {
      toggleEndPicker();
    }
  };

  const toggleTimeStartPicker = () => {
    setShowTimeStart(!showTimeStart);
  };

  const toggleTimeEndPicker = () => {
    setShowTimeEnd(!showTimeEnd);
  };

  const onChangeTimeStart = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setTime(currentDate);

    if (Platform.OS === 'android') {
      toggleTimeStartPicker();
    }
  };

  const onChangeTimeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setTime1(currentDate);

    if (Platform.OS === 'android') {
      toggleTimeEndPicker();
    }
  };

  return (
    <S.Wrapper behavior="position" keyboardVerticalOffset={-120}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <S.Body>
            <S.ContainerTitle>
              <S.Title>Criar Novo Evento</S.Title>
            </S.ContainerTitle>
            <S.AllDescrition>
              <S.Subtitle>Intervalo de Datas</S.Subtitle>
              <S.Description>
                <S.Icon source={IconDate} />
                <S.Text>Início:</S.Text>
                {showStartPicker && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChangeStart}
                    themeVariant="light"
                  />
                )}
                <S.ContainerInputDate>
                  {!showStartPicker && (
                    <Pressable onPress={toggleStartPicker}>
                      <S.inputDate
                        placeholder="Selecione uma data de início"
                        value={moment(date.toDateString()).format('DD/MM/YYYY')}
                        onChangeText={setDate}
                        editable={false}
                        onPressIn={toggleStartPicker}
                      />
                    </Pressable>
                  )}
                </S.ContainerInputDate>
              </S.Description>
              <S.Description>
                <S.Icon source={IconDate} />
                <S.Text>Fim:</S.Text>
                {showEndPicker && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date1}
                    onChange={onChangeEnd}
                    style={styles.datePicker}
                    themeVariant="light"
                    // negativeButton={{ label: 'Cancel', textColor: 'red' }}
                    // positiveButton={{ label: 'OK', textColor: 'black' }}
                  />
                )}
                <S.ContainerInputDate>
                  {!showEndPicker && (
                    <Pressable onPress={toggleEndPicker}>
                      <S.inputDate
                        placeholder="Selecione uma data de término"
                        value={moment(date1.toDateString()).format(
                          'DD/MM/YYYY'
                        )}
                        onChangeText={setDate1}
                        editable={false}
                        onPressIn={toggleEndPicker}
                      />
                    </Pressable>
                  )}
                </S.ContainerInputDate>
              </S.Description>
            </S.AllDescrition>
            <S.AllDescrition>
              <S.Subtitle>Intervalo de Tempo</S.Subtitle>
              <S.Description>
                <S.Icon source={IconClock} />
                <S.Text>De:</S.Text>
                {showTimeStart && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={time}
                    onChange={onChangeTimeStart}
                    themeVariant="light"
                  />
                )}
                <S.ContainerInputDate>
                  {!showTimeStart && (
                    <Pressable onPress={toggleTimeStartPicker}>
                      <S.inputDate
                        placeholder="Selecione um horário de início"
                        value={format(time, 'HH:mm')}
                        onChangeText={setTime}
                        editable={false}
                        onPressIn={toggleTimeStartPicker}
                      />
                    </Pressable>
                  )}
                </S.ContainerInputDate>
              </S.Description>
              <S.Description>
                <S.Icon source={IconClock} />
                <S.Text>Até:</S.Text>
                {showTimeEnd && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={time1}
                    onChange={onChangeTimeEnd}
                    themeVariant="light"
                  />
                )}
                <S.ContainerInputDate>
                  {!showTimeEnd && (
                    <Pressable onPress={toggleTimeEndPicker}>
                      <S.inputDate
                        placeholder="Selecione o fim do intervalo"
                        value={format(time1, 'HH:mm')}
                        onChangeText={setTime1}
                        editable={false}
                        onPressIn={toggleTimeEndPicker}
                      />
                    </Pressable>
                  )}
                </S.ContainerInputDate>
              </S.Description>
            </S.AllDescrition>
            <S.AllDescrition>
              <S.Subtitle>Duração Estimada</S.Subtitle>
              <S.Description>
                <S.Icon source={IconClock} />
                <S.Text>Tempo:</S.Text>
                <S.ContainerInputDate>
                  <S.InputDate
                    type="datetime"
                    options={{
                      format: 'HH:mm',
                    }}
                    placeholder="00h:00min"
                    value={durations}
                    onChangeText={(word) => {
                      setDurations(word);
                    }}
                  />
                </S.ContainerInputDate>
              </S.Description>
            </S.AllDescrition>
            <S.Buttons>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SelectGuests');
                }}
              >
                <Button
                  width="136px"
                  backgroundColor="#FAFAFA"
                  borderColor="#949494"
                  hasIcon={false}
                  title="Voltar"
                  titleColor="#949494"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  sendData();
                  navigation.navigate('SuggestSchedule', {
                    mandatoryContactSelected,
                    contactSelected,
                  });
                }}
              >
                <Button
                  width="136px"
                  backgroundColor="#3446E4"
                  borderColor="transparent"
                  hasIcon={false}
                  title="Enviar"
                  titleColor="#FAFAFA"
                />
              </TouchableOpacity>
            </S.Buttons>
          </S.Body>
        </TouchableWithoutFeedback>
      </ScrollView>
    </S.Wrapper>
  );
};

export default DateAndSchedule;
