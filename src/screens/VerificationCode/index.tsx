import * as S from './styles';
import Button from '@components/Button';
import InputCode from '@components/InputCode';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const Logo = require('../../assets/Logo.png');
const Message = require('../../assets/MessageIcon.png');
const Phone = require('../../assets/PhoneIcon.png');

const VerificationCode: React.FC = ({ navigation }) => {
  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.Logo source={Logo} />
      <S.ContainerTitle>
        <S.TitleI>Insira o </S.TitleI>
        <S.TitleII>código!</S.TitleII>
      </S.ContainerTitle>
      <InputCode height="32px" width="240px" placeholder="––––––" />
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
          backgroundColor="#FAFAFA"
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
