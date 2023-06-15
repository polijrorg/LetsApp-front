import * as S from './styles';
import Button from '@components/Button';
import InputCode from '@components/InputCode';
import { api } from '@services/api';
import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> df561fcce2f41199fc0f83f8a585f63ba8e37298
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
import { ProfileContext } from 'src/contexts/ProfileContext';

const Logo = require('../../assets/Logo.png');
const Message = require('../../assets/MessageIcon.png');
const Phone = require('../../assets/PhoneIcon.png');

const VerificationCode: React.FC = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const { phoneUser } = useContext(ProfileContext);

  useEffect(() => {
    const handleSmsReceived = async (message) => {
      const verificationCode = message.body.match(/\d{6}/)[0];
      setVerificationCode(verificationCode);
      try {
        const { data } = await api.post('/verify', {
          verificationCode,
        });
        console.log(data);
        navigation.navigate('Profile');
      } catch (error) {
        console.log(error);
      }
      // if (verificationCode === '111111') {
      //   navigation.navigate('Home');
      // }
    };
    const subscription = SmsListener.addListener(handleSmsReceived);
    return () => {
      subscription.remove();
    };
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
<<<<<<< HEAD
      <S.Wrapper behavior="position" keyboardVerticalOffset={-200}>
=======
      <S.Wrapper behavior="position">
>>>>>>> df561fcce2f41199fc0f83f8a585f63ba8e37298
        <S.Body>
          <StatusBar hidden={true} />
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
                try {
<<<<<<< HEAD
                  const { data } = await api.post('/verify', {
                    phone: phoneUser,
                    code: parseInt(value, 10),
                  });
                  console.log(data);
                  navigation.navigate('InitialData');
=======
                  const phone = '+5511998821010';
                  const { data } = await api.post('/verify', {
                    phone: phone,
                    code: value,
                  });
                  console.log(data);
                  navigation.navigate('Profile');
>>>>>>> df561fcce2f41199fc0f83f8a585f63ba8e37298
                } catch (error) {
                  console.log(error);
                }
              }}
              keyboardType="numeric"
            />
            <S.Descrition>
              Preencha aqui com o código recebido por SMS
            </S.Descrition>
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => {
                navigation.navigate('InitialData');
              }}
            >
              <Button
                width="328px"
                backgroundColor="#3446E4"
                borderColor="transparent"
                hasIcon={true}
                icon={Message}
                title="Reenviar código"
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
          <S.SmallCircleLeft />
          <S.SmallCircleRight />
          <S.SmallTop />
        </S.Body>
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default VerificationCode;
