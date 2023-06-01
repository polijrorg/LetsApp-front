import * as S from './styles';
import Button from '@components/Button';
import Input from '@components/Input';
import { ModalCard } from '@components/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/PublicRoutes';
import { api } from '@services/api';
import { UserContext } from '@utils/UserContext';
import * as AuthSession from 'expo-auth-session';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
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

const InitialData: React.FC = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUser, setImageUser] = useState('');
  const [firstRequisition, setFirstRequisition] = useState(false);

  const appNavigation = useNavigation<AppNavigatorRoutesProps>();

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

  const { photo, setPhoto } = useContext(UserContext);

  async function handleSendData({ name, imageUser }: FormDataProps) {
    try {
      const phone = '+5511953975915';
      const form = new FormData();
      form.append('phone', phone);
      form.append('name', name);
      form.append('photo', imageUser);

      const { data } = await api.post('/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newPhoto = data.photo;
      setPhoto(newPhoto);

      console.log(data);
      console.log('New photo', photo);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePress() {
    try {
      const result = await handleSendData({ name, imageUser });
      console.log(result);
      appNavigation.navigate('MainScreen', {
        imageUser: imageUser,
      });
      setFirstRequisition(true);
    } catch (error) {
      console.log(error);
    }
    // if (firstRequisition === true) {
    //   try {
    // const phone = '+5511953975915';
    // const form = new FormData();
    // form.append('phone', phone);
    // const { data } = await api.get('/getAuthUrl', {
    //   phone,
    // });
    //   const phone = '+5511953975915';
    //   const form = new FormData();
    //   form.append('phone', phone);

    //   const { data } = await api.get('/upload', form, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   const response = await AuthSession.startAsync(data);
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
    // }
    // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.settings.readonly&client_id=460915142438-07m2mml77f2e50k1ub9l0nt8aeivm8sl.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3030&response_type=code`;
    // const response = await AuthSession.startAsync({ authUrl });
    // console.log(response);
  }

  return (
    <S.Wrapper behavior="position" keyboardVerticalOffset={-140}>
      <S.Body>
        <StatusBar hidden={true} />
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
        {/* <S.SmallCircleLeft /> */}
        <S.SmallCircleRight />
        <S.SmallTop />
      </S.Body>
    </S.Wrapper>
  );
};

export default InitialData;
