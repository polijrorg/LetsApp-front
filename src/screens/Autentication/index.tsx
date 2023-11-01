import * as S from './styles';
import Button from '@components/Button';
import Input from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@hooks/useAuth';
import React, { useState, useEffect, createRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import * as yup from 'yup';

const Logo = require('../../assets/Logo.png');
const Message = require('../../assets/MessageIcon.png');

type FormDataProps = {
  DDD: string;
  phone: string;
};

const ValidationSchema = yup.object({
  phone: yup
    .string()
    .required('Informe o número do seu celular')
    .length(9, 'Número de celular inválido'),

  DDD: yup.string().required('Informe seu DDD').length(2, 'DDD inválido'),
});

const Autentication = ({ navigation }) => {
  const { register } = useAuth();
  const DDDref = createRef<TextInput>();
  const phoneRef = createRef<TextInput>();

  const [DDD, setDDD] = useState('');
  const [phone, setPhone] = useState('');

  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(ValidationSchema),
  });

  async function handleSignUp() {
    try {
      const formattedPhone = `+55${DDD}${phone}`;
      await register({ phone: formattedPhone });
      navigation.navigate('VerificationCode');
    } catch (error) {
      console.log(error);
    }
  }

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

  // Remover os ouvintes de eventos de teclado quando o componente for desmontado
  useEffect(() => {
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  });

  const handleAutoTab = () => {
    phoneRef.current.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <S.Wrapper behavior="position" keyboardVerticalOffset={-160}>
        <S.Body>
          <S.Content>
            <S.Logo source={Logo} />
            <S.Title>LetsApp</S.Title>
            <S.Description>
              Você receberá em breve um SMS com o código de verificação.
            </S.Description>
            <Input
              arrow={true}
              height="32px"
              width="304px"
              placeholder="Brasil"
              editable={false}
            />
            <S.ContainerInputs>
              <S.Errors>
                <Controller
                  control={control}
                  name="DDD"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      arrow={false}
                      height="32px"
                      width="60px"
                      placeholder="DDD"
                      value={value}
                      onChange={(e) => {
                        const inputValue = e;
                        if (inputValue.length <= 2) {
                          onChange(inputValue);
                          setDDD(inputValue);
                        }
                        if (e.length === 2) {
                          handleAutoTab();
                        }
                      }}
                      keyboardType="numeric"
                      ref={DDDref}
                    />
                  )}
                />
                {errors.DDD && <S.TextError>{errors.DDD?.message}</S.TextError>}
              </S.Errors>
              <S.Spacer />
              <S.Errors>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      arrow={false}
                      height="32px"
                      width="238px"
                      placeholder="Número"
                      value={value}
                      onChange={(e) => {
                        const inputValue = e;
                        if (inputValue.length <= 9) {
                          onChange(inputValue);
                          setPhone(inputValue);
                        }
                      }}
                      keyboardType="numeric"
                      ref={phoneRef}
                    />
                  )}
                />
                {errors.phone && (
                  <S.TextError>{errors.phone?.message}</S.TextError>
                )}
              </S.Errors>
            </S.ContainerInputs>
            <TouchableOpacity onPress={handleSubmit(handleSignUp)}>
              <Button
                width="144px"
                backgroundColor="#3446E4"
                borderColor="transparent"
                hasIcon={false}
                icon={Message}
                title="Continuar"
                titleColor="#FAFAFA"
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

export default Autentication;
