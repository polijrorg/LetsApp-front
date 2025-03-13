import useAuth from '@hooks/useAuth';
import CalendarServices from '@services/CalendarServices';
import * as AuthSession from 'expo-auth-session';
import React from 'react';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { TouchableOpacity } from 'react-native';

import * as S from './styles';

export const ModalCalendar: React.FC = () => {
  const GoogleCalendar = require('../../assets/GoogleCalendar.png');
  const Outlook = require('../../assets/Outlook.png');

  const { user, updateUser } = useAuth();

  // const handleDeepLink = async (url) => {
  //   WebBrowser.dismissBrowser();
  // }

  async function handleGetGoogleUrl() {
    try {
      const googleUrl = await CalendarServices.getGoogleUrl(user?.phone);
      // await AuthSession.startAsync({ authUrl: googleUrl });
      // Linking.addEventListener('url', handleDeepLink.bind(this));
      await WebBrowser.openBrowserAsync(googleUrl);
      await updateUser();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetOutlookUrl() {
    try {
      const googleUrl = await CalendarServices.getOutlookUrl(user?.phone);
      // await AuthSession.startAsync({ authUrl: googleUrl });
      await WebBrowser.openBrowserAsync(googleUrl);
      await updateUser();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <S.ModalView>
      <S.ContentContainer>
        <S.Title>Vincular Agenda</S.Title>
        <S.Description>
          Vincule sua agenda Google ou Outlook para possuir a experiência
          completa do aplicativo!
        </S.Description>
        <S.ContainerButtons>
          <TouchableOpacity onPress={handleGetGoogleUrl}>
            <S.Input>
              <S.ImageCalendars source={GoogleCalendar} />
              <S.NameCalendar>Google Calendar</S.NameCalendar>
            </S.Input>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGetOutlookUrl}>
            <S.Input>
              <S.ImageCalendars source={Outlook} />
              <S.NameCalendar>Outlook</S.NameCalendar>
            </S.Input>
          </TouchableOpacity>
        </S.ContainerButtons>
        {/* <S.DescritionBottom>
          * Você pode alterar ou adicionar calendários em seu perfil
        </S.DescritionBottom> */}
      </S.ContentContainer>
    </S.ModalView>
  );
};
