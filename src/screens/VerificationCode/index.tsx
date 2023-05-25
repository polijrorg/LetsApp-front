import * as S from './styles';
import Button from '@components/Button';
import InputCode from '@components/InputCode';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

const Logo = require('../../assets/Logo.png');
const Message = require('../../assets/MessageIcon.png');
const Phone = require('../../assets/PhoneIcon.png');

const VerificationCode: React.FC = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    console.log('antesantess');
    const subscription = SmsListener.addListener((message) => {
      console.log('antes');
      const verificationCode = message.body.match(/\d{6}/)[0];
      setVerificationCode(verificationCode);
      console.log('depois');
      // use o método `confirm` do Firebase para verificar o código
      // exemplo: firebase.auth().signInWithCredential(credential);
      if (verificationCode === '111111') {
        navigation.navigate('Home');
      }
    });

    return () => {
      subscription.remove();
    };
  }, [navigation]);

  return (
    <S.Body>
      <StatusBar hidden={true} />
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
        onChange={(value) => {
          if (value === '111111') {
            navigation.navigate('InitialData');
          } else setVerificationCode(value);
        }}
        keyboardType="numeric"
      />
      <S.Descrition>Preencha aqui com o código recebido por SMS</S.Descrition>
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
      <S.SmallCircleLeft />
      <S.SmallCircleRight />
      <S.SmallTop />
    </S.Body>
  );
};

export default VerificationCode;
