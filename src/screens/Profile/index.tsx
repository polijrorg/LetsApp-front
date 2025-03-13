import * as S from './styles';
import FixedButton from '@components/FixedButton';
import FixedInput from '@components/FixedInput';
import Input from '@components/Input';
import { ModalCard } from '@components/Modal';
import useAuth from '@hooks/useAuth';
import { theme } from '@styles/default.theme';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

const IconArrow = require('../../assets/ArrowBack.png');
const IconProfile = require('../../assets/UserCircle.png');
const IconDelete = require('../../assets/IconDelete.png');

const Profile = ({ navigation, route }) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { user, addNameAndImage } = useAuth();

  const { imageUser } = route.params;

  async function pickImageFromGallery() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (!photoSelected.canceled && photoSelected.assets[0].uri) {
        const fileExtension = photoSelected.assets[0].uri.split('.').pop();

        setImage({
          name: `random-file-name`,
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
      setIsLoading(true);
      const form = new FormData();
      form.append('phone', user?.phone);
      form.append('name', name || user.name);
      image && form.append('photo', image);

      await addNameAndImage(form);

      setIsLoading(false);
      navigation.navigate('MainScreen');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      {isLoading && (
        <S.SpinnerWrapper>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </S.SpinnerWrapper>
      )}
      <S.Body>
        <S.SmallCircleRight />
        <S.SmallTop />
        <S.SmallBottom />
        <S.IconBackContainer>
          <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
            <S.IconBack source={IconArrow} />
          </TouchableOpacity>
        </S.IconBackContainer>
        <S.Header>
          {image || imageUser ? (
            <S.ProfileContainer onPress={() => pickImageFromGallery()}>
              <S.Icon
                source={{ uri: image ? image.uri : imageUser }}
                image={image || imageUser}
              />
              <S.PencilIconCircle>
                <S.PencilIcon source={require('../../assets/Pencil.png')} />
              </S.PencilIconCircle>
            </S.ProfileContainer>
          ) : (
            <S.ProfileContainer onPress={() => pickImageFromGallery()}>
              <S.Icon source={IconProfile} image={imageUser} />
              <S.PencilIconCircle>
                <S.PencilIcon source={require('../../assets/Pencil.png')} />
              </S.PencilIconCircle>
            </S.ProfileContainer>
          )}
        </S.Header>
        <S.ContainerInput>
          <S.NameInput>Pessoal</S.NameInput>
          <FixedInput
            width="100%"
            height="40px"
            value={name || user?.name}
            setValue={setName}
            pencil
            placeholder="Insira seu nome"
          />
          <S.Line />
          <S.NameInput>Agenda</S.NameInput>
          <S.InputAndXContainer>
            <S.FlexibleInputContainer>
              <Input
                width="100%"
                height="40px"
                placeholder={user?.email}
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
                placeholder={user?.phone}
                editable={false}
              />
            </S.FlexibleInputContainer>
          </S.InputAndXContainer>
          <S.Gap />
          <FixedButton width="100%" title="Salvar" onPress={handleSendData} />
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
    </>
  );
};

export default Profile;
