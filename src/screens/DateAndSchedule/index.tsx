import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const DateAndSchedule: React.FC = ({ navigation }) => {
  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.Title>Convidados</S.Title>
      <S.Subtitle>Minha Agenda</S.Subtitle>
      <S.Mandatory>Obrigatório?</S.Mandatory>
    </S.Body>
  );
};

export default DateAndSchedule;
