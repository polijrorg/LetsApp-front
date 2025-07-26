import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Alert } from 'react-native';
import CalendarServices from '@services/CalendarServices';
import * as S from './styles';
import { theme } from '@styles/default.theme';
import * as WebBrowser from 'expo-web-browser';
import useAuth from '@hooks/useAuth';

interface AuthenticationModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (provider: 'google' | 'outlook') => void;
  userPhone: string;
}

export const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  visible,
  onClose,
  onSuccess,
  userPhone,
}) => {
  const { user, updateUser } = useAuth();

  const GoogleCalendar = require('../../assets/GoogleCalendar.png');
  const Outlook = require('../../assets/Outlook.png');
  const [loading, setLoading] = useState<'google' | 'outlook' | null>(null);

  const handleGoogleAuth = async () => {
    try {
      setLoading('google');
      console.log('🔵 Iniciando autenticação Google Calendar');
      console.log(`📞 Telefone: ${userPhone}`);
      const authUrl = await CalendarServices.getGoogleUrl(userPhone);
      // await WebBrowser.openBrowserAsync(authUrl);
      const result = await WebBrowser.openBrowserAsync(authUrl, {
        dismissButtonStyle: 'close',
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.OVER_CURRENT_CONTEXT,
      });
      await updateUser();  
      console.log('URL de autenticação Google:', authUrl);
    } catch (error) {
      console.error('Erro na autenticação Google:', error);
      Alert.alert('Erro', 'Falha na autenticação do Google Calendar');
    } finally {
      setLoading(null);
    }
  };

  const handleOutlookAuth = async () => {
    try {
      setLoading('outlook');
      const authUrl = await CalendarServices.getOutlookUrl(userPhone);

      await WebBrowser.openAuthSessionAsync(authUrl, 'let-sapp://auth');
      await updateUser();
      // Para React Native, usar WebBrowser ou AuthSession do Expo
      // import * as WebBrowser from 'expo-web-browser';
      // const result = await WebBrowser.openAuthSessionAsync(authUrl, 'letsapp://auth');
      
      console.log('URL de autenticação Outlook:', authUrl);
    } catch (error) {
      console.error('Erro na autenticação Outlook:', error);
      Alert.alert('Erro', 'Falha na autenticação do Outlook Calendar');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={S.styles.overlay}>
        <View style={S.styles.modal}>
          <Text style={S.styles.title}>Conectar Calendário</Text>
          <Text style={S.styles.subtitle}>
            Escolha qual calendário deseja conectar para sincronizar seus eventos
          </Text>

          <TouchableOpacity
            style={[S.styles.button, S.styles.googleButton]}
            onPress={handleGoogleAuth}
            disabled={loading !== null}
          >
            <S.ImageCalendars source={GoogleCalendar} />
            <Text style={S.styles.buttonText}>
              {loading === 'google' ? 'Conectando...' : 'Google Calendar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[S.styles.button, S.styles.outlookButton]}
            onPress={handleOutlookAuth}
            disabled={loading !== null}
          >
            <S.ImageCalendars source={Outlook} />
            <Text style={S.styles.buttonText}>
              {loading === 'outlook' ? 'Conectando...' : 'Outlook Calendar'}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[S.styles.button, S.styles.cancelButton]}
            onPress={onClose}
            disabled={loading !== null}
          >
            <Text style={[S.styles.buttonText, S.styles.cancelText]}>
              Cancelar
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

