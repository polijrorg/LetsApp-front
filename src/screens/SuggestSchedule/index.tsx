import * as S from './styles';
import Button from '@components/Button';
import CardSchedule from '@components/CardSchedule';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const SuggestSchedule: React.FC = ({ navigation }) => {
  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.ContainerTitle>
        <S.Title>Sugerir Horário</S.Title>
      </S.ContainerTitle>
      <S.Subtitle>Segunda - 30/01 </S.Subtitle>
      <S.ContainerSuggest>
        <CardSchedule day="Seg" date="30" schedule="16h às 17h" />
        <CardSchedule day="Seg" date="30" schedule="17h às 18h" />
      </S.ContainerSuggest>
      <S.Subtitle>Quarta - 01/02 </S.Subtitle>
      <S.ContainerSuggest>
        <CardSchedule day="Qua" date="01" schedule="18h às 19h" />
        <CardSchedule day="Qua" date="01" schedule="19h às 20h" />
      </S.ContainerSuggest>
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
            navigation.navigate('CreateEvent');
          }}
        >
          <Button
            width="136px"
            backgroundColor="#3446E4"
            borderColor="transparent"
            hasIcon={false}
            title="Próximo"
            titleColor="#FAFAFA"
          />
        </TouchableOpacity>
      </S.Buttons>
    </S.Body>
  );
};

export default SuggestSchedule;
