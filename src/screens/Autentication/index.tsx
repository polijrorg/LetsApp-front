import * as S from './styles';
import Button from '@components/Button';
import Input from '@components/Input';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const Logo = require('../../assets/Logo.png');
const Message = require('../../assets/MessageIcon.png');

const Autentication: React.FC = ({}) => {
  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.Logo source={Logo} />
      <S.Title>LetsApp</S.Title>
      <S.Descrition>
        Você receberá em breve um SMS com o código de verificação.
      </S.Descrition>
      <Input
        arrow={true}
        height="32px"
        width="304px"
        placeholder="Selecione seu país"
      />
      <S.ContainerInputs>
        <Input arrow={false} height="32px" width="60px" placeholder="DDD" />
        <Input arrow={false} height="32px" width="238px" placeholder="Número" />
      </S.ContainerInputs>
      <Button
        width="144px"
        backgroundColor="#3446E4"
        borderColor="transparent"
        hasIcon={false}
        icon={Message}
        title="Continuar"
        titleColor="#FAFAFA"
      />
      <S.SmallCircleLeft />
      <S.SmallCircleRight />
      <S.SmallTop />
    </S.Body>
  );
};

export default Autentication;
