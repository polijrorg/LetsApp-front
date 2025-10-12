import * as S from './styles';
import Button from '@components/Button';
import useCountDown from '@components/CountDown';
import InputCode from '@components/InputCode';
import useAuth from '@hooks/useAuth';
import UserServices from '@services/UserServices';
import { api } from '@services/api';
import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Platform,
} from 'react-native';
import SmsUserConsent from 'react-native-sms-user-consent';

const Logo = require('../../assets/Logo.png');
const Message = require('../../assets/MessageIcon.png');
const Phone = require('../../assets/PhoneIcon.png');

const VerificationCode = ({ navigation, route }) => {
  const { formattedPhone } = route.params;
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { secondsLeft, startCountDown } = useCountDown();
  const { initialUser, updateUser } = useAuth();
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardActive(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardActive(false));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCountdown = async () => {
    try {
      const response = await fetch('https://letsapp.polijrinternal.com/resendCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formattedPhone }),
      });

      if (!response.ok) throw new Error(`Erro ao reenviar o código: ${response.status}`);

      setCountdown(true);
      startCountDown(60);
      setElapsedTime(0);

      Alert.alert('Sucesso', 'Código reenviado com sucesso!');
    } catch (error) {
      console.error('Erro ao reenviar o código:', error);
      Alert.alert('Erro', 'Não foi possível reenviar o código. Tente novamente.');
    }
  };

  // Auto resend code on load
  useEffect(() => {
    UserServices.resendCode(formattedPhone);
  }, [formattedPhone]);

  useEffect(() => {
    // Only run on Android
    if (Platform.OS !== 'android') {
      return;
    }

    // Check if module is available
    if (!SmsUserConsent || typeof SmsUserConsent.startSmsListener !== 'function') {
      console.warn('SMS User Consent module not available on this platform');
      return;
    }

    const startSmsListener = async () => {
      try {
        // Request phone number hint (optional)
        const phoneNumber = await SmsUserConsent.requestHint().catch(err => {
          console.log('Phone hint not available:', err);
          return null;
        });
        
        if (phoneNumber) {
          console.log('Hinted phone number:', phoneNumber);
        }

        // Start listening for SMS
        const listener = SmsUserConsent.startSmsListener(event => {
          const message = event?.message;
          if (!message) return;

          const code = message.match(/\d{6}/)?.[0];
          if (code) {
            setVerificationCode(code);
            api
              .post('/verify', { 
                phone: formattedPhone, 
                code: parseInt(code, 10) 
              })
              .then(async (response) => {
                console.log('Auto-verification successful:', response.data);
                navigation.navigate('InitialData');
              })
              .catch(err => {
                console.error('Verify error:', err);
                Alert.alert('Erro', 'Código inválido. Tente novamente.');
              });
          }
        });

        console.log('SMS listener started successfully');
      } catch (err) {
        console.error('SMS User Consent error:', err);
      }
    };

    startSmsListener();
  }, [formattedPhone, navigation]);

  useEffect(() => {
    if (countdown) {
      setElapsedTime(prev => prev + 1);
      if (elapsedTime >= 60) {
        setCountdown(false);
        setElapsedTime(0);
      }
    }
  }, [secondsLeft, countdown, elapsedTime]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <S.Wrapper behavior="position" keyboardVerticalOffset={-200}>
        <S.Body>
          <S.Content>
            <S.Logo source={Logo} />
            <S.ContainerTitle>
              <S.TitleI>Insira o </S.TitleI>
              <S.TitleII>código!</S.TitleII>
            </S.ContainerTitle>

            <InputCode
              height="48px"
              width="240px"
              placeholder=""
              value={verificationCode}
              onChange={async value => {
                setVerificationCode(value);
                if (value.length === 6) {
                  try {
                    const response = await api.post('/verify', {
                      phone: formattedPhone,
                      code: parseInt(value, 10),
                    });
                    
                    console.log('Verification successful:', response.data);
                    navigation.navigate('InitialData');
                  } catch (error) {
                    console.error('Verification error:', error);
                    Alert.alert('Erro', 'Código inválido. Tente novamente.');
                  }
                }
              }}
              keyboardType="numeric"
            />

            <S.Description>Preencha aqui com o código recebido por SMS</S.Description>

            <TouchableOpacity
              activeOpacity={0.5}
              disabled={countdown}
              style={{ opacity: countdown ? 0.8 : 1 }}
              onPress={handleCountdown}
            >
              <Button
                width="328px"
                backgroundColor={countdown ? '#949494' : '#3446E4'}
                borderColor="transparent"
                hasIcon
                icon={Message}
                title={
                  countdown
                    ? `Reenviar código (${secondsLeft}s)`
                    : 'Reenviar código'
                }
                titleColor="#FAFAFA"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Autentication')}
            >
              <Button
                width="328px"
                backgroundColor="#FFFFFF"
                borderColor="#949494"
                hasIcon
                icon={Phone}
                title="Mudar número"
                titleColor="#949494"
              />
            </TouchableOpacity>
          </S.Content>

          {!isKeyboardActive && <S.SmallCircleLeft />}
          <S.SmallCircleRight />
          <S.SmallTop />
        </S.Body>
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default VerificationCode;