import * as S from './styles';
import Button from '@components/Button';
import Input from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '@services/api';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { ProfileContext } from 'src/contexts/ProfileContext';
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

const Autentication: React.FC = ({ navigation }) => {
  const [DDD, setDDD] = useState('');
  const [phone, setPhone] = useState('');
  const { setPhoneUser } = useContext(ProfileContext);

  const Phone = `+55${DDD}${phone}`;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(ValidationSchema),
  });

  async function handleSignUp() {
    // try {
    //   const { data } = await api.post('/register', {
    //     phone: Phone,
    //   });
    //   setPhoneUser(Phone);

    //   console.log(data);

    navigation.navigate('VerificationCode');
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <S.Wrapper behavior="position" keyboardVerticalOffset={-160}>
        <S.Body>
          <StatusBar hidden={true} />
          <S.Content>
            <S.Logo source={Logo} />
            <S.Title>LetsApp</S.Title>
            <S.Descrition>
              Você receberá em breve um SMS com o código de verificação.
            </S.Descrition>
            <Input
              arrow={true}
              height="32px"
              width="304px"
              placeholder="Brasil"
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
                      }}
                      keyboardType="numeric"
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
          <S.SmallCircleLeft />
          <S.SmallCircleRight />
          <S.SmallTop />
        </S.Body>
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default Autentication;
