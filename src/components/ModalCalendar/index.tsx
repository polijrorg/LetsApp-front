import * as S from './styles';
import { api } from '@services/api';
import * as AuthSession from 'expo-auth-session';
import React, { useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { ProfileContext } from 'src/contexts/ProfileContext';

type ModalProps = {
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigation?: any;
  screen?: string;
};

export const ModalCalendar: React.FC<ModalProps> = ({
  Open,
  setOpen,
}: ModalProps) => {
  const GoogleCalendar = require('../../assets/GoogleCalendar.png');
  const Outlook = require('../../assets/Outlook.png');

  const { phoneUser } = useContext(ProfileContext);

  async function handleSendData() {
    try {
      const phone = phoneUser;
      const { data } = await api.post(
        `/getAuthUrl/${encodeURIComponent(phone)}`
      );
      const authUrl = data;
      const response = await AuthSession.startAsync({ authUrl });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <S.ModalContainer transparent visible={Open}>
      <S.ModalView onPressOut={() => setOpen(false)}>
        <S.ContentContainer>
          <S.Title>Vincular Agenda</S.Title>
          <S.Descrition>
            Vincule sua agenda Google ou Outlook para possuir a experiência
            completa do aplicativo!
          </S.Descrition>
          <S.ContainerButtons>
            <TouchableOpacity onPress={handleSendData}>
              <S.Input>
                <S.ImageCalendars source={GoogleCalendar} />
                <S.NameCalendar>Google Calendar</S.NameCalendar>
              </S.Input>
            </TouchableOpacity>
            <TouchableOpacity>
              <S.Input>
                <S.ImageCalendars source={Outlook} />
                <S.NameCalendar>Outlook</S.NameCalendar>
              </S.Input>
            </TouchableOpacity>
          </S.ContainerButtons>
          <S.DescritionBottom>
            * Você pode alterar ou adicionar calendários em seu perfil
          </S.DescritionBottom>
        </S.ContentContainer>
      </S.ModalView>
    </S.ModalContainer>
  );
};
