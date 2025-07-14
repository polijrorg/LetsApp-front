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
} from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

const Logo = require('../../assets/Logo.png');
const Message = require('../../assets/MessageIcon.png');
const Phone = require('../../assets/PhoneIcon.png');

const VerificationCode = ({ navigation, route }) => {
  const { formattedPhone } = route.params; // Acessa o formattedPhone passado como parâmetro
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { secondsLeft, startCountDown } = useCountDown();
  const { initialUser } = useAuth();
  const [phone, setPhone] = useState('');
  
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  // Ouvinte para o teclado ficar ativo
  const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      setIsKeyboardActive(true);
    }
  );

  // Ouvinte para o teclado ficar inativo
  const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
      setIsKeyboardActive(false);
    }
  );

  const handleCountdown = async () => {
    try {
      const response = await fetch('https://letsapp.polijrinternal.com/resendCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formattedPhone, // Usa formattedPhone
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao reenviar o código: ${response.status}`);
      }
      setPhone(formattedPhone);
      setCountdown(true);
      startCountDown(60);
      setElapsedTime(0);

      Alert.alert('Sucesso', 'Código reenviado com sucesso!');
    } catch (error) {
      console.error('Erro ao reenviar o código:', error);
      Alert.alert('Erro', 'Não foi possível reenviar o código. Tente novamente.');
    }
  };

  useEffect(() => {
    setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    if (elapsedTime === 60) {
      setCountdown(false);
      setElapsedTime(0);
    }
  }, [secondsLeft]);

  useEffect(() => {
    const handleSmsReceived = async (message) => {
      const code = message.body.match(/\d{6}/)[0];
      setVerificationCode(code);
      console.log(' formattedPhone:', formattedPhone);
      try {
        await api.post('/verify', {
          phone: formattedPhone, // Usa formattedPhone
          code: parseInt(code, 10),
        });
        navigation.navigate('Profile');
      } catch (error) {
        console.log(error);
      }
    };
    const subscription = SmsListener.addListener(handleSmsReceived);
    return () => {
      subscription.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [navigation, formattedPhone]); // Adiciona formattedPhone como dependência

  useEffect(() => {
    // Envia o código automaticamente ao carregar a tela
    // UserServices.resendCode(formattedPhone);
  }, [formattedPhone]); // Adiciona formattedPhone como dependência

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
              height="32px"
              width="240px"
              placeholder=""
              value={verificationCode}
              onChange={async (value) => {
                setVerificationCode(value);
                if (value.length === 6) {
                  try {
                    await api.post('/verify', {
                      phone: formattedPhone, // Usa formattedPhone
                      code: parseInt(value, 10),
                    });
                    navigation.navigate('InitialData');
                  } catch (error) {
                    console.log('Erro verifycode', error);
                  }
                }
              }}
              keyboardType="numeric"
            />
            <S.Description>
              Preencha aqui com o código recebido por SMS
            </S.Description>
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
                hasIcon={true}
                icon={Message}
                title={countdown ? `Reenviar código (${secondsLeft}s)` : 'Reenviar código'}
                titleColor="#FAFAFA"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Autentication');
              }}
            >
              <Button
                width="328px"
                backgroundColor="#FFFFFF"
                borderColor="#949494"
                hasIcon={true}
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