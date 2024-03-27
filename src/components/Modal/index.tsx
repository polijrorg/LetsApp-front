import * as S from './styles';
import Button from '@components/Button';
import FixedInput from '@components/FixedInput';
import Input from '@components/Input';
import useAuth from '@hooks/useAuth';
import { IDeleteUserRequest } from '@services/UserServices';
import { api } from '@services/api';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

type ModalProps = {
  color?: string;
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
  screen?: string;
  type: 'Schedule' | 'Number' | 'Account' | 'Contact';
  valueEmail?: string;
  onChangeEmail?: (text: string) => void;
  name?: string;
  setName?: (text: string) => void;
  phoneNumber?: string;
  setPhoneNumber?: (text: string) => void;
  email?: string;
  setEmail?: (text: string) => void;
  addParticipant?: () => void;
};

export const ModalCard: React.FC<ModalProps> = ({
  Open,
  setOpen,
  navigation,
  screen,
  type,
  onChangeEmail,
  valueEmail,
  name,
  setName,
  // phoneNumber,
  // setPhoneNumber,
  email,
  setEmail,
  addParticipant,
}: ModalProps) => {
  const [isSelected, setSelected] = useState(false);
  // const [inputs, setInputs] = useState([]);
  const Message = require('../../assets/MessageIcon.png');

  const { deleteUser, user } = useAuth();

  // const handleAddInput = (value) => {
  //   setInputs([...inputs, value]);
  // };

  async function handleSendData() {
    try {
      const form = new FormData();
      form.append('id', user.id);
      form.append('email', valueEmail);

      const { data } = await api.post('/updateEmail', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(data);

      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteAccount() {
    try {
      await deleteUser({
        phone: user?.phone,
      } as IDeleteUserRequest);
    } catch (error) {
      console.log(error);
    }
  }

  let title;
  let description;

  if (type === 'Schedule') {
    title = 'Vincular Nova Agenda';
    description = 'Concordo com os termos de uso.';
  } else if (type === 'Number') {
    title = 'Adicionar Novo Número';
    description = '';
  } else if (type === 'Account') {
    title = 'Apagar conta';
    description = 'Tem certeza que deseja apagar a conta?';
  } else if (type === 'Contact') {
    title = 'Adicionar Novo Contato';
    description = '';
  }

  return (
    <S.ModalContainer transparent visible={Open}>
      <S.ModalView onPressOut={() => setOpen(false)}>
        <S.ContentContainer>
          <S.Title type={type}>{title}</S.Title>
          {type === 'Schedule' ? (
            <Input
              height="32px"
              width="278px"
              placeholder="nome@gmail.com"
              onChange={onChangeEmail}
              value={valueEmail}
            />
          ) : type === 'Number' ? (
            <S.ContainerInputs>
              <Input
                arrow={false}
                height="32px"
                width="60px"
                placeholder="DDD"
              />

              <Input
                arrow={false}
                height="32px"
                width="200px"
                placeholder="Número"
              />
            </S.ContainerInputs>
          ) : type === 'Contact' ? (
            <S.ContainerInputsContact>
              <FixedInput
                height="32px"
                width="278px"
                placeholder="Nome"
                value={name}
                setValue={setName}
              />
              {/* <FixedInput
                height="32px"
                width="278px"
                placeholder="Telefone"
                value={phoneNumber}
                setValue={setPhoneNumber}
              /> */}
              <FixedInput
                height="32px"
                width="278px"
                placeholder="Email"
                value={email}
                setValue={setEmail}
              />
            </S.ContainerInputsContact>
          ) : null}
          <S.ContainerDescrition>
            <S.Descrtion>{description}</S.Descrtion>
            {type === 'Schedule' ? (
              <CheckBox
                checkedIcon="check"
                uncheckedIcon="square-o"
                checkedColor="#545454"
                uncheckedColor="#545454"
                checked={isSelected}
                onPress={() => setSelected(!isSelected)}
              />
            ) : null}
          </S.ContainerDescrition>
          <TouchableOpacity
            onPress={() => {
              if (screen) {
                navigation.navigate(screen);
              }
              // handleAddInput(Input);
              handleSendData();
              setOpen(false);
              if (type === 'Contact') {
                addParticipant();
              }
            }}
          >
            {type === 'Account' ? (
              <S.ContainerButtons>
                <TouchableOpacity
                  onPress={() => {
                    setOpen(false);
                  }}
                >
                  <Button
                    backgroundColor="#FAFAFA"
                    width="112px"
                    title="Cancelar"
                    titleColor="#FF0000"
                    borderColor="transparent"
                    hasIcon={false}
                    icon={Message}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={DeleteAccount}>
                  <Button
                    backgroundColor="#FF0000"
                    width="112px"
                    title="Apagar"
                    titleColor="#FAFAFA"
                    borderColor="transparent"
                    hasIcon={false}
                    icon={Message}
                  />
                </TouchableOpacity>
              </S.ContainerButtons>
            ) : (
              <Icon name="check" size={30} color="#3446E4" />
            )}
          </TouchableOpacity>
        </S.ContentContainer>
      </S.ModalView>
    </S.ModalContainer>
  );
};
