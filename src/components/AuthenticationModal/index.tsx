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
      console.log('🔗 URL de autenticação Google:', authUrl);
      
      // Validate URL before opening
      if (!authUrl || !authUrl.startsWith('http')) {
        console.error('❌ Invalid URL received:', authUrl);
        throw new Error('URL inválida recebida do servidor');
      }
      
      // URL is already properly encoded by the backend - use it directly
      const result = await WebBrowser.openBrowserAsync(authUrl, {
        dismissButtonStyle: 'close',
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.OVER_CURRENT_CONTEXT,
        showTitle: false,
        enableBarCollapsing: false,
      });
      
      console.log('🔵 WebBrowser result:', result);
      
      // If user completed the OAuth flow successfully, update user data
      if (result.type === 'cancel') {
        console.log('🔵 User cancelled authentication');
        return;
      }
      
      // Retry logic for updating user data with exponential backoff
      const retryUpdateUser = async (attempts = 3, initialDelay = 3000) => {
        for (let i = 0; i < attempts; i++) {
          try {
            const delay = initialDelay * Math.pow(1.5, i); // Exponential backoff
            console.log(`🔵 Waiting ${delay}ms for backend processing (attempt ${i + 1}/${attempts})`);
            await new Promise(resolve => setTimeout(resolve, delay));
            
            console.log(`🔵 Attempting to update user data (attempt ${i + 1}/${attempts})`);
            await updateUser();
            console.log('🔵 User data updated successfully after OAuth');
            
            // Call success callback and close modal
            onSuccess('google');
            return true;
          } catch (error) {
            console.error(`❌ Error updating user (attempt ${i + 1}/${attempts}):`, error);
            
            if (i === attempts - 1) {
              // Last attempt failed
              throw error;
            }
          }
        }
        return false;
      };
      
      await retryUpdateUser();
      
    } catch (error) {
      console.error('❌ Erro na autenticação Google:', error);
      
      let errorMessage = 'Houve um problema ao conectar seu calendário. Verifique sua conexão com a internet e tente novamente.';
      
      if (error.message && error.message.includes('URL inválida')) {
        errorMessage = 'URL de autenticação inválida. Tente novamente ou contate o suporte.';
      }
      
      Alert.alert('Erro de Conexão', errorMessage, [{ text: 'OK' }]);
    } finally {
      setLoading(null);
    }
  };

  const handleOutlookAuth = async () => {
    try {
      setLoading('outlook');
      console.log('🔵 Iniciando autenticação Outlook Calendar');
      console.log(`📞 Telefone: ${userPhone}`);
      
      const authUrl = await CalendarServices.getOutlookUrl(userPhone);
      console.log('🔗 URL de autenticação Outlook:', authUrl);
      
      // Validate URL before opening
      if (!authUrl || !authUrl.startsWith('http')) {
        console.error('❌ Invalid URL received:', authUrl);
        throw new Error('URL inválida recebida do servidor');
      }
      
      // URL is already properly encoded by the backend - use it directly
      const result = await WebBrowser.openBrowserAsync(authUrl, {
        dismissButtonStyle: 'close',
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.OVER_CURRENT_CONTEXT,
        showTitle: false,
        enableBarCollapsing: false,
      });
      
      console.log('🔵 WebBrowser result:', result);
      
      // If user completed the OAuth flow successfully, update user data
      if (result.type === 'cancel') {
        console.log('🔵 User cancelled authentication');
        return;
      }
      
      // Retry logic for updating user data with exponential backoff
      const retryUpdateUser = async (attempts = 3, initialDelay = 3000) => {
        for (let i = 0; i < attempts; i++) {
          try {
            const delay = initialDelay * Math.pow(1.5, i); // Exponential backoff
            console.log(`🔵 Waiting ${delay}ms for backend processing (attempt ${i + 1}/${attempts})`);
            await new Promise(resolve => setTimeout(resolve, delay));
            
            console.log(`🔵 Attempting to update user data (attempt ${i + 1}/${attempts})`);
            await updateUser();
            console.log('🔵 User data updated successfully after OAuth');
            
            // Call success callback and close modal
            onSuccess('outlook');
            return true;
          } catch (error) {
            console.error(`❌ Error updating user (attempt ${i + 1}/${attempts}):`, error);
            
            if (i === attempts - 1) {
              // Last attempt failed
              throw error;
            }
          }
        }
        return false;
      };
      
      await retryUpdateUser();
      
    } catch (error) {
      console.error('❌ Erro na autenticação Outlook:', error);
      
      let errorMessage = 'Houve um problema ao conectar seu calendário. Verifique sua conexão com a internet e tente novamente.';
      
      if (error.message && error.message.includes('URL inválida')) {
        errorMessage = 'URL de autenticação inválida. Tente novamente ou contate o suporte.';
      }
      
      Alert.alert('Erro de Conexão', errorMessage, [{ text: 'OK' }]);
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

