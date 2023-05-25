import * as S from './styles';
import Contact from '@components/Contact';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const IconArrow = require('../../assets/ArrowBackBlack.png');
const IconSearch = require('../../assets/IconSearch.png');
const IconEmail = require('../../assets/Email.png');
const IconSend = require('../../assets/Send.png');

const SelectGuests: React.FC = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.Header>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MainScreen');
          }}
        >
          <S.IconBack source={IconArrow} />
        </TouchableOpacity>
        <S.Title>Convidados</S.Title>
      </S.Header>
      <S.ContainerSearch>
        <S.ContainerIcon>
          <S.IconSearch source={IconSearch} />
        </S.ContainerIcon>
        <S.InputSearch
          placeholder="Pesquisar..."
          value={search}
          onChangeText={(texto) => setSearch(texto)}
        />
      </S.ContainerSearch>
      <S.ContainerEmail>
        <S.ContainerIcon>
          <S.IconEmail source={IconEmail} />
        </S.ContainerIcon>
        <S.InputEmail
          placeholder="Email"
          value={email}
          onChangeText={(texto) => setEmail(texto)}
        />
        <S.ContainerIcon>
          <S.IconSend source={IconSend} />
        </S.ContainerIcon>
      </S.ContainerEmail>
      <S.Scroll>
        <S.ContainerSubtitle>
          <S.Subtitle>Contatos Frequentes</S.Subtitle>
          <S.Mandatory>Obrigatório?</S.Mandatory>
        </S.ContainerSubtitle>
        <Contact name="Cainã" phoneOrEmail="11953975915" />
        <Contact name="Cainã" phoneOrEmail="11953975915" />
        <Contact name="Cainã" phoneOrEmail="11953975915" />
        <S.ContainerSubtitle>
          <S.Subtitle>Minha Agenda</S.Subtitle>
          <S.Mandatory>Obrigatório?</S.Mandatory>
        </S.ContainerSubtitle>
        <Contact name="Cainã" phoneOrEmail="11953975915" />
        <Contact name="Cainã" phoneOrEmail="11953975915" />
        <Contact name="Cainã" phoneOrEmail="11953975915" />
        <Contact name="Cainã" phoneOrEmail="11953975915" />
        <Contact name="Cainã" phoneOrEmail="11953975915" />
        <Contact name="Cainã" phoneOrEmail="11953975915" />
        <Contact name="Cainã" phoneOrEmail="11953975915" />
        <Contact name="Cainã" phoneOrEmail="11953975915" />
        <Contact name="Cainã" phoneOrEmail="11953975915" />
      </S.Scroll>
    </S.Body>
  );
};

export default SelectGuests;
