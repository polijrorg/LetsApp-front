import * as S from './styles';
import Input from '@components/Input';
import { ModalCard } from '@components/Modal';
import useAuth from '@hooks/useAuth';
// import { useNavigation } from '@react-navigation/native';
// import { AppNavigatorRoutesProps } from '@routes/PublicRoutes';
// import { api } from '@services/api';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const IconArrow = require('../../assets/ArrowBack.png');
const Agenda = require('../../assets/Calendar.png');
const IconPhone = require('../../assets/PhoneIconBlack.png');
const IconProfile = require('../../assets/UserCircle.png');
const IconDelete = require('../../assets/IconDelete.png');

const Profile = ({ navigation, route }) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { user, addNameAndImage } = useAuth();

  const { name, imageUser, email, phone } = route.params;

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

        // setImageOfUser({
        //   name: `${(Math.random() * 165531534654).toFixed()}.${fileExtension}`,
        //   uri: photoSelected.assets[0].uri,
        //   type: `${photoSelected.assets[0].type}/${fileExtension}`,
        // } as any);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async function handleSendData() {
    try {
      const form = new FormData();
      form.append('phone', user.phone);
      form.append('name', user.name);
      // form.append('photo', imageOfUser);

      addNameAndImage(form);

      navigation.navigate('MainScreen');

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.SmallCircleRight />
      <S.SmallTop />
      <S.SmallBottom />
      <S.IconBackContainer>
        <TouchableOpacity onPress={handleSendData}>
          <S.IconBack source={IconArrow} />
        </TouchableOpacity>
      </S.IconBackContainer>
      <S.Header>
        {imageUser ? (
          <S.ProfileContainer onPress={() => pickImageFromGallery()}>
            <S.Icon source={{ uri: imageUser }} />
            <S.PencilIconCircle>
              <S.PencilIcon source={require('../../assets/Pencil.png')} />
            </S.PencilIconCircle>
          </S.ProfileContainer>
        ) : (
          <S.ProfileContainer onPress={() => pickImageFromGallery()}>
            <S.Icon source={IconProfile} />
            <S.PencilIconCircle>
              <S.PencilIcon source={require('../../assets/Pencil.png')} />
            </S.PencilIconCircle>
          </S.ProfileContainer>
        )}
      </S.Header>
      <S.ContainerInput>
        <S.NameInput>Pessoal</S.NameInput>
        <S.EditInput>
          <Input
            width="100%"
            height="40px"
            placeholder={name}
            pencil
            editable={false}
          />
        </S.EditInput>
        <S.Line />
        <S.NameInput>Agenda</S.NameInput>
        <S.InputAndXContainer>
          <S.FlexibleInputContainer>
            <Input
              width="100%"
              height="40px"
              placeholder={email}
              editable={false}
            />
          </S.FlexibleInputContainer>
        </S.InputAndXContainer>
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
        >
          {/* <S.ContainerAdd>
            <S.IconAdd source={Agenda} />
            <S.TextAdd>Vincular nova agenda</S.TextAdd>
          </S.ContainerAdd> */}
          <ModalCard
            Open={open}
            setOpen={setOpen}
            navigation={navigation}
            screen="Profile"
            type="Schedule"
          />
        </TouchableOpacity>
        <S.Line />
        <S.NameInput>Número</S.NameInput>
        <S.InputAndXContainer>
          <S.FlexibleInputContainer>
            <Input
              width="100%"
              height="40px"
              placeholder={phone}
              editable={false}
            />
          </S.FlexibleInputContainer>
        </S.InputAndXContainer>
        <TouchableOpacity
          onPress={() => {
            setOpen1(true);
          }}
        >
          {/* <S.ContainerAdd>
            <S.IconAdd source={IconPhone} />
            <S.TextAdd>Adicionar outro número</S.TextAdd>
          </S.ContainerAdd> */}
          <ModalCard
            Open={open1}
            setOpen={setOpen1}
            navigation={navigation}
            screen="Profile"
            type="Number"
          />
        </TouchableOpacity>
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
