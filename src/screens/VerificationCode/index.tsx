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
} from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

const Logo = require('../../assets/Logo.png');
const Message = require('../../assets/MessageIcon.png');
const Phone = require('../../assets/PhoneIcon.png');

const VerificationCode = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { secondsLeft, startCountDown } = useCountDown();
  const { initialUser } = useAuth();

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
    await UserServices.resendCode(initialUser?.phone);
    setCountdown(true);
    startCountDown(60);
    setElapsedTime(0);
  };

  useEffect(() => {
    setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    if (elapsedTime === 60) {
      setCountdown(false);
      setElapsedTime(0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  useEffect(() => {
    const handleSmsReceived = async (message) => {
      const code = message.body.match(/\d{6}/)[0];
      setVerificationCode(code);
      try {
        await api.post('/verify', {
          verificationCode,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    initialUser.name ? UserServices.resendCode(initialUser?.phone) : null;
    console.log(initialUser.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      phone: initialUser?.phone,
                      code: parseInt(value, 10),
                    });
                    navigation.navigate('InitialData');
                  } catch (error) {
                    console.log(error);
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
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ opacity: countdown ? 0.8 : 1 }}
              onPress={() => {
                handleCountdown();
              }}
            >
              <Button
                width="328px"
                backgroundColor={countdown ? '#949494' : '#3446E4'}
                borderColor="transparent"
                hasIcon={true}
                icon={Message}
                title="Reenviar código"
                titleColor="#FAFAFA"
                secondsLeft={secondsLeft}
                countDown={countdown}
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
