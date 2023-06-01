import * as S from './styles';
import Input from '@components/Input';
import { ModalCard } from '@components/Modal';
import { UserContext } from '@utils/UserContext';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';

const IconArrow = require('../../assets/ArrowBack.png');
const Agenda = require('../../assets/Calendar.png');
const IconPhone = require('../../assets/PhoneIconBlack.png');
const IconProfile = require('../../assets/UserCircle.png');
const IconDelete = require('../../assets/IconDelete.png');

const Profile: React.FC = ({ navigation, route }) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { name, imageUser } = route.params;

  const { photo } = useContext(UserContext);

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.SmallCircleRight />
      <S.SmallTop />
      <S.Header>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MainScreen');
          }}
        >
          <S.IconBack source={IconArrow} />
        </TouchableOpacity>
        {imageUser ? (
          <S.Icon source={imageUser} />
        ) : (
          <S.Icon source={IconProfile} />
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
