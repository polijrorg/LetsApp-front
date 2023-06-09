import * as S from './styles';
import Button from '@components/Button';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const DateAndSchedule: React.FC = ({ navigation }) => {
  const IconClock = require('../../assets/ClockIcon.png');
  const IconDate = require('../../assets/DateIcon.png');

  const [date, setDate] = useState('');
  const [date1, setDate1] = useState('');
  const [time, setTime] = useState('');
  const [time1, setTime1] = useState('');

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.ContainerTitle>
        <S.Title>Criar Novo Evento</S.Title>
      </S.ContainerTitle>
      <S.AllDescrition>
        <S.Subtitle>Intervalo de Datas</S.Subtitle>
        <S.Descrition>
          <S.Icon source={IconDate} />
          <S.Text>Início:</S.Text>
          <S.ContainerInputDate>
            <S.InputDate
              type="datetime"
              options={{
                format: 'DD/MM/YYYY',
              }}
              placeholder="__/__/____"
              value={date}
              onChangeText={(word) => {
                setDate(word);
              }}
            />
          </S.ContainerInputDate>
        </S.Descrition>
        <S.Descrition>
          <S.Icon source={IconDate} />
          <S.Text>Fim:</S.Text>
          <S.ContainerInputDate>
            <S.InputDate
              type="datetime"
              options={{
                format: 'DD/MM/YYYY',
              }}
              placeholder="__/__/____"
              value={date1}
              onChangeText={(word) => {
                setDate1(word);
              }}
            />
          </S.ContainerInputDate>
        </S.Descrition>
      </S.AllDescrition>
      <S.AllDescrition>
        <S.Subtitle>Intervalo de Tempo</S.Subtitle>
        <S.Descrition>
          <S.Icon source={IconClock} />
          <S.Text>De:</S.Text>
          <S.ContainerInputDate>
            <S.InputDate
              type="datetime"
              options={{
                format: 'HH:mm',
              }}
              placeholder="00h:00min"
              value={time}
              onChangeText={(word) => {
                setTime(word);
              }}
            />
          </S.ContainerInputDate>
        </S.Descrition>
        <S.Descrition>
          <S.Icon source={IconClock} />
          <S.Text>Até:</S.Text>
          <S.ContainerInputDate>
            <S.InputDate
              type="datetime"
              options={{
                format: 'HH:mm',
              }}
              placeholder="00h:00min"
              value={time1}
              onChangeText={(word) => {
                setTime1(word);
              }}
            />
          </S.ContainerInputDate>
        </S.Descrition>
      </S.AllDescrition>
      <S.AllDescrition>
        <S.Subtitle>Duração Estimada</S.Subtitle>
        <S.Descrition>
          <S.Icon source={IconClock} />
          <S.Text>Tempo:</S.Text>
          <S.ContainerInputDate>
            <S.InputDate
              type="datetime"
              options={{
                format: 'HH:mm',
              }}
              placeholder="00h:00min"
              value={time}
              onChangeText={(word) => {
                setTime(word);
              }}
            />
          </S.ContainerInputDate>
        </S.Descrition>
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
            navigation.navigate('SuggestSchedule');
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
  );
};

export default DateAndSchedule;
