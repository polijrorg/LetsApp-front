/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from './styles';
import Input from '@components/Input';
import { ModalCard } from '@components/Modal';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/PublicRoutes';
import { api } from '@services/api';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { ProfileContext } from 'src/contexts/ProfileContext';

const IconArrow = require('../../assets/ArrowBack.png');
const Agenda = require('../../assets/Calendar.png');
const IconPhone = require('../../assets/PhoneIconBlack.png');
const IconProfile = require('../../assets/UserCircle.png');
const IconDelete = require('../../assets/IconDelete.png');

const Profile: React.FC = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  // const { name, imageUser } = route.params;

  const appNavigation = useNavigation<AppNavigatorRoutesProps>();

  type photoProps = {
    size: number;
  };

  type FormDataProps = {
    username: string;
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

        setImageOfUser({
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

  async function handleSendData() {
    try {
      const form = new FormData();
      form.append('phone', phoneUser);
      form.append('name', nameUser);
      form.append('photo', imageOfUser);

      const { data } = await api.post('/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      appNavigation.navigate('MainScreen');

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const { nameUser, setNameUser, imageOfUser, setImageOfUser, phoneUser } =
    useContext(ProfileContext);

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.SmallCircleRight />
      <S.SmallTop />
      <S.Header>
        <TouchableOpacity onPress={handleSendData}>
          <S.IconBack source={IconArrow} />
        </TouchableOpacity>
        {imageOfUser ? (
          <TouchableOpacity onPress={() => pickImageFromGallery()}>
            <S.Icon source={imageOfUser} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => pickImageFromGallery()}>
            <S.Icon source={IconProfile} />
          </TouchableOpacity>
        )}
      </S.Header>
      <S.ContainerInput>
        <S.NameInput>Pessoal</S.NameInput>
        <Input width="304px" height="32px" placeholder="" />
        <S.Line />
        <S.NameInput>Agendas</S.NameInput>
        <Input width="304px" height="32px" placeholder="" />
        <Input width="304px" height="32px" placeholder="" />
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
        >
          <S.ContainerAdd>
            <S.IconAdd source={Agenda} />
            <S.TextAdd>Vincular nova agenda</S.TextAdd>
          </S.ContainerAdd>
          <ModalCard
            Open={open}
            setOpen={setOpen}
            navigation={navigation}
            screen="Profile"
            type="Schedule"
          />
        </TouchableOpacity>
        <S.Line />
        <S.NameInput>Números</S.NameInput>
        <Input width="304px" height="32px" placeholder="" />
        <TouchableOpacity
          onPress={() => {
            setOpen1(true);
          }}
        >
          <S.ContainerAdd>
            <S.IconAdd source={IconPhone} />
            <S.TextAdd>Adicionar outro número</S.TextAdd>
          </S.ContainerAdd>
          <ModalCard
            Open={open1}
            setOpen={setOpen1}
            navigation={navigation}
            screen="Profile"
            type="Number"
          />
        </TouchableOpacity>
        <S.Line />
      </S.ContainerInput>
      <TouchableOpacity
        onPress={() => {
          setOpen2(true);
        }}
      >
        <S.ContainerDelete>
          <S.Delete>Apagar a conta</S.Delete>
          <S.IconDelete source={IconDelete} />
        </S.ContainerDelete>
        <ModalCard
          Open={open2}
          setOpen={setOpen2}
          navigation={navigation}
          screen="Profile"
          type="Account"
        />
      </TouchableOpacity>
    </S.Body>
  );
};

export default Profile;
