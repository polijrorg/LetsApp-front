import * as S from './styles';
import Button from '@components/Button';
import Input from '@components/Input';
import { ModalCard } from '@components/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@hooks/useAuth';
// import UserServices from '@services/UserServices';
// import { useNavigation } from '@react-navigation/native';
// import { AppNavigatorRoutesProps } from '@routes/PublicRoutes';
// import { api } from '@services/api';
// import * as AuthSession from 'expo-auth-session';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import * as yup from 'yup';

const Logo = require('../../assets/Logo.png');
const Message = require('../../assets/MessageIcon.png');
const Gallery = require('../../assets/Gallery.png');

type FormErrors = {
  name: string;
};

const ValidationSchema = yup.object({
  name: yup.string().required('Informe o nome de usuário'),
});

const InitialData = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUser, setImageUser] = useState(null);

  const { addNameAndImage, phone } = useAuth();

  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormErrors>({
    resolver: yupResolver(ValidationSchema),
  });

  async function pickImageFromGallery() {
    try {
      const result: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          aspect: [4, 4],
          allowsEditing: true,
        });

      if (!result.canceled && result.assets[0].uri) {
        const fileExtension = result.assets[0].uri.split('.').pop();

        setImageUser({
          name: `random-file-name`,
          uri: result.assets[0].uri,
          type: `${result.assets[0].type}/${fileExtension}`,
        } as any);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async function handleSendData() {
    try {
      const form = new FormData();
      form.append('phone', phone);
      form.append('name', name);
      form.append('photo', imageUser);

      await addNameAndImage(form);
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <S.Wrapper behavior="position" keyboardVerticalOffset={-220}>
        <S.Body>
          <S.Content>
            <S.Logo source={Logo} />
            <S.Title>Dados Iniciais</S.Title>
            <S.Description>
              Preencha aqui com a sua foto e seu nome
            </S.Description>
            <TouchableOpacity onPress={() => pickImageFromGallery()}>
              {imageUser ? (
                <S.Gallery
                  source={{ uri: imageUser.uri }}
                  resizeMode={'cover'}
                />
              ) : (
                <S.Gallery source={Gallery} resizeMode={'cover'} />
              )}
            </TouchableOpacity>
            <S.Errors>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    arrow={false}
                    height="40px"
                    width="328px"
                    placeholder="Seu nome"
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      setName(e);
                    }}
                  />
                )}
              />
              {errors.name && <S.TextError>{errors.name?.message}</S.TextError>}
            </S.Errors>
            <S.Empty />
            <TouchableOpacity onPress={handleSubmit(handleSendData)}>
              <Button
                width="328px"
                backgroundColor="#3446E4"
                borderColor="transparent"
                hasIcon={false}
                icon={Message}
                title="Salvar"
                titleColor="#FAFAFA"
              />
              <ModalCard
                Open={open}
                setOpen={setOpen}
                navigation={navigation}
                screen="MainScreen"
                type="Schedule"
                valueEmail={email}
                onChangeEmail={(text) => setEmail(text)}
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

export default InitialData;
