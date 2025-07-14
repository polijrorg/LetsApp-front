import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CalendarServices from '@services/CalendarServices';

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
  const [loading, setLoading] = useState<'google' | 'outlook' | null>(null);

  const handleGoogleAuth = async () => {
    try {
      setLoading('google');
      const authUrl = await CalendarServices.getGoogleUrl(userPhone);
      
      // Para React Native, usar WebBrowser ou AuthSession do Expo
      // import * as WebBrowser from 'expo-web-browser';
      // const result = await WebBrowser.openAuthSessionAsync(authUrl, 'letsapp://auth');
      
      console.log('URL de autenticação Google:', authUrl);
      Alert.alert(
        'Autenticação Google',
        'Redirecionando para autenticação...',
        [
          {
            text: 'OK',
            onPress: () => {
              onSuccess('google');
              onClose();
            }
          }
        ]
      );
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
      
      // Para React Native, usar WebBrowser ou AuthSession do Expo
      // import * as WebBrowser from 'expo-web-browser';
      // const result = await WebBrowser.openAuthSessionAsync(authUrl, 'letsapp://auth');
      
      console.log('URL de autenticação Outlook:', authUrl);
      Alert.alert(
        'Autenticação Outlook',
        'Redirecionando para autenticação...',
        [
          {
            text: 'OK',
            onPress: () => {
              onSuccess('outlook');
              onClose();
            }
          }
        ]
      );
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
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Conectar Calendário</Text>
          <Text style={styles.subtitle}>
            Escolha qual calendário deseja conectar para sincronizar seus eventos
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={handleGoogleAuth}
            disabled={loading !== null}
          >
            <Text style={styles.buttonText}>
              {loading === 'google' ? 'Conectando...' : 'Google Calendar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.outlookButton]}
            onPress={handleOutlookAuth}
            disabled={loading !== null}
          >
            <Text style={styles.buttonText}>
              {loading === 'outlook' ? 'Conectando...' : 'Outlook Calendar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
            disabled={loading !== null}
          >
            <Text style={[styles.buttonText, styles.cancelText]}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
    lineHeight: 22,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  outlookButton: {
    backgroundColor: '#0078D4',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    color: '#666',
  },
});

