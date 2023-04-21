import * as S from './styles';
import Button from '@components/Button';
import Input from '@components/Input';
import { ModalCard } from '@components/Modal';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const Logo = require('../../assets/Logo.png');
const Message = require('../../assets/MessageIcon.png');
const Gallery = require('../../assets/Gallery.png');

const InitialData: React.FC = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 600,
      },
      (response) => {
        if (response.didCancel || response.errorCode) {
          console.log('User cancelled image picker or there was an error');
          return;
        }

        if (response.assets.length > 0) {
          const source = { uri: response.assets[0].uri };
          setImage(source);
        }
      }
    );
  };

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.Logo source={Logo} />
      <S.Title>Dados Iniciais</S.Title>
      <S.Descrition>Preencha aqui com a sua foto e seu nome</S.Descrition>
      <TouchableOpacity
        onPress={() => {
          pickImage;
        }}
      >
        {setImage ? (
          <S.Gallery source={Gallery} />
        ) : (
          <S.Gallery source={image} />
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
