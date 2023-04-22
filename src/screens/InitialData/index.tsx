import * as S from './styles';
import Button from '@components/Button';
import Input from '@components/Input';
import { ModalCard } from '@components/Modal';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const Logo = require('../../assets/Logo.png');
const Message = require('../../assets/MessageIcon.png');
const Gallery = require('../../assets/Gallery.png');

const InitialData: React.FC = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [imageUser, setImageUser] = useState('');

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUser(result.assets[0].uri);
    }
  };

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.Logo source={Logo} />
      <S.Title>Dados Iniciais</S.Title>
      <S.Descrition>Preencha aqui com a sua foto e seu nome</S.Descrition>
      <TouchableOpacity onPress={() => pickImageFromGallery()}>
        {imageUser === '' ? (
          <S.Gallery source={Gallery} resizeMode={'cover'} />
        ) : (
          <S.Gallery source={{ uri: imageUser }} resizeMode={'cover'} />
        )}
      </TouchableOpacity>
      <Input arrow={false} height="40px" width="328px" placeholder="Seu nome" />
      <S.Empty />

      <TouchableOpacity
        onPress={() => {
          setOpen(true);
        }}
      >
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
        />
      </TouchableOpacity>
      <S.SmallCircleLeft />
      <S.SmallCircleRight />
      <S.SmallTop />
    </S.Body>
  );
};

export default InitialData;
