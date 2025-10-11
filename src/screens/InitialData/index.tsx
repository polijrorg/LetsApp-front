import * as S from './styles';
import Button from '@components/Button';
import Input from '@components/Input';
import { ModalCard } from '@components/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Platform,
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
  const [isLoading, setIsLoading] = useState(false);

  const { addNameAndImage, phone } = useAuth();
  console.log('Phone from auth:', phone);

  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormErrors>({
    resolver: yupResolver(ValidationSchema),
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardActive(true)
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardActive(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  async function pickImageFromGallery() {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Precisamos de permissão para acessar suas fotos.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // Updated API - use array instead of MediaTypeOptions
        quality: 0.8, // Reduced quality for smaller file size
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (!result.canceled && result.assets[0].uri) {
        const uri = result.assets[0].uri;
        const fileExtension = uri.split('.').pop() || 'jpg';
        const fileName = uri.split('/').pop() || `profile-${Date.now()}.${fileExtension}`;
        
        // Get the mime type
        const mimeType = result.assets[0].type === 'video' 
          ? `video/${fileExtension}`
          : `image/${fileExtension}`;

        setImageUser({
          uri,
          name: fileName,
          type: mimeType,
        });

        console.log('Image selected:', { uri, name: fileName, type: mimeType });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  }

  async function handleSendData() {
    if (isLoading) return;

    try {
      setIsLoading(true);

      // Validate required fields
      if (!name || name.trim() === '') {
        Alert.alert('Erro', 'Por favor, informe seu nome.');
        return;
      }

      if (!phone) {
        Alert.alert('Erro', 'Telefone não encontrado. Tente fazer login novamente.');
        navigation.navigate('Autentication');
        return;
      }

      const formData = new FormData();
      
      // Add phone and name
      formData.append('phone', phone);
      formData.append('name', name.trim());

      // Add image if exists
      if (imageUser) {
        // React Native FormData expects this format
        formData.append('photo', {
          uri: Platform.OS === 'ios' ? imageUser.uri.replace('file://', '') : imageUser.uri,
          name: imageUser.name,
          type: imageUser.type,
        } as any);
      }

      console.log('Sending data:', {
        phone,
        name: name.trim(),
        hasImage: !!imageUser,
      });

      await addNameAndImage(formData);

      // Success - navigate or show success message
      console.log('Data saved successfully');
      
    } catch (error) {
      console.error('Error saving data:', error);
      
      // More specific error handling
      if (error.response) {
        console.error('Server error:', error.response.data);
        Alert.alert(
          'Erro',
          error.response.data?.message || 'Erro ao salvar dados. Tente novamente.'
        );
      } else if (error.request) {
        Alert.alert(
          'Erro de conexão',
          'Não foi possível conectar ao servidor. Verifique sua internet.'
        );
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
      }
    } finally {
      setIsLoading(false);
    }
  }

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
            <TouchableOpacity 
              onPress={pickImageFromGallery}
              disabled={isLoading}
            >
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
                    editable={!isLoading}
                  />
                )}
              />
              {errors.name && <S.TextError>{errors.name?.message}</S.TextError>}
            </S.Errors>
            <S.Empty />
            <TouchableOpacity 
              onPress={handleSubmit(handleSendData)}
              disabled={isLoading}
              activeOpacity={0.7}
            >
              <Button
                width="328px"
                backgroundColor={isLoading ? '#949494' : '#3446E4'}
                borderColor="transparent"
                hasIcon={false}
                icon={Message}
                title={isLoading ? 'Salvando...' : 'Salvar'}
                titleColor="#FAFAFA"
              />
            </TouchableOpacity>
            <ModalCard
              Open={open}
              setOpen={setOpen}
              navigation={navigation}
              screen="MainScreen"
              type="Schedule"
              valueEmail={email}
              onChangeEmail={(text) => setEmail(text)}
            />
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