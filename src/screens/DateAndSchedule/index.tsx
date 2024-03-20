import * as S from './styles';
import Button from '@components/Button';
import useInvite from '@hooks/useInvite';
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '@styles/default.theme';
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
import Toast from 'react-native-root-toast';

const styles = StyleSheet.create({
  datePicker: {
    height: 150,
  },
});

const DateAndSchedule = ({ navigation }) => {
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
    useInvite();

  const sendData = () => {
    if (moment(date).diff(new Date(), 'days') < 0) {
      displayDateErrorToast('❌ Data de início inválida');
      return;
    } else if (moment(date1).diff(date) < 0) {
      displayDateErrorToast('❌ Intervalo de datas inválido');
      return;
    } else if (!durations || parseInt(durations, 10) === 0) {
      displayDateErrorToast('❌ Selecione a duração do evento');
      return;
    } else if (moment(time1).diff(time, 'minutes') < parseInt(durations, 10)) {
      displayDateErrorToast('❌ Intervalo de tempo inválido');
      return;
    }
    setDateStart(date);
    setDateEnd(date1);
    setTimeStart(time);
    setTimeEnd(time1);
    setDuration(durations);
    navigation.navigate('SuggestSchedule');
  };

  const toggleStartPicker = () => {
    setShowStartPicker(!showStartPicker);
    setShowTimeEnd(false);
    setShowTimeStart(false);
    setShowEndPicker(false);
  };

  const toggleEndPicker = () => {
    setShowEndPicker(!showEndPicker);
    setShowTimeEnd(false);
    setShowTimeStart(false);
    setShowStartPicker(false);
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
    setShowTimeEnd(false);
    setShowEndPicker(false);
    setShowStartPicker(false);
  };

  const toggleTimeEndPicker = () => {
    setShowTimeEnd(!showTimeEnd);
    setShowTimeStart(false);
    setShowEndPicker(false);
    setShowStartPicker(false);
  };

  const disableSpinners = () => {
    setShowTimeEnd(false);
    setShowTimeStart(false);
    setShowEndPicker(false);
    setShowStartPicker(false);
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

  function displayDateErrorToast(message: string) {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: 120,
      shadow: true,
      animation: true,
      hideOnPress: true,
      backgroundColor: theme.colors.white,
      textColor: theme.colors.highEmphasis,
    });
  }

  return (
    <S.Wrapper behavior="position" keyboardVerticalOffset={-120}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            disableSpinners();
          }}
        >
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
                        value={moment(date).format('DD/MM/YYYY')}
                        onChangeText={(text) => setDate(new Date(text))}
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
                  />
                )}
                <S.ContainerInputDate>
                  {!showEndPicker && (
                    <Pressable onPress={toggleEndPicker}>
                      <S.inputDate
                        placeholder="Selecione uma data de término"
                        value={moment(date1).format('DD/MM/YYYY')}
                        onChangeText={(text) => setDate1(new Date(text))}
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
                        onChangeText={(text) => setTime(new Date(text))}
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
                        onChangeText={(text) => setTime1(new Date(text))}
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
                    type="only-numbers"
                    placeholder="00min"
                    placeholderTextColor={theme.colors.lowEmphasis}
                    value={durations}
                    onChangeText={(word) => {
                      setDurations(word);
                    }}
                    onPressIn={disableSpinners}
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
