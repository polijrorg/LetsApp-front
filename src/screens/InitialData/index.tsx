import * as S from './styles';
import Button from '@components/Button';
import Input from '@components/Input';
import { ModalCard } from '@components/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/PublicRoutes';
import { api } from '@services/api';
import * as AuthSession from 'expo-auth-session';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
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
  const [imageUser, setImageUser] = useState('');

  const appNavigation = useNavigation<AppNavigatorRoutesProps>();
  const { phoneUser, setNameUser, setImageOfUser } = useContext(ProfileContext);

  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormErrors>({
    resolver: yupResolver(ValidationSchema),
  });

  type photoProps = {
    size: number;
  };

  type FormDataProps = {
    name: string;
    imageUser: string;
  };

  async function pickImageFromGallery() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (!photoSelected.canceled && photoSelected.assets[0].uri) {
        const photoInfo = (await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        )) as photoProps;

        const fileExtension = photoSelected.assets[0].uri.split('.').pop();

        setImageUser({
          name: `${(Math.random() * 165531534654).toFixed()}.${fileExtension}`,
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async function handleSendData({ name, imageUser }: FormDataProps) {
    try {
      const form = new FormData();
      form.append('phone', phoneUser);
      form.append('name', name);
      form.append('photo', imageUser);

      const { data } = await api.post('/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNameUser(name);
      setImageOfUser(imageUser);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePress() {
    try {
      const result = await handleSendData({ name, imageUser });
      appNavigation.navigate('MainScreen');
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
          <StatusBar hidden={true} />
          <S.Content>
            <S.Logo source={Logo} />
            <S.Title>Dados Iniciais</S.Title>
            <S.Descrition>Preencha aqui com a sua foto e seu nome</S.Descrition>
            <TouchableOpacity onPress={() => pickImageFromGallery()}>
              {imageUser === '' ? (
                <S.Gallery source={Gallery} resizeMode={'cover'} />
              ) : (
                <S.Gallery source={imageUser} resizeMode={'cover'} />
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
            <TouchableOpacity onPress={handleSubmit(handlePress)}>
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
