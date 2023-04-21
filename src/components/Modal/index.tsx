import * as S from './styles';
import Button from '@components/Button';
import Input from '@components/Input';
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
  type: 'Schedule' | 'Number' | 'Account';
};

export const ModalCard: React.FC<ModalProps> = ({
  Open,
  setOpen,
  navigation,
  screen,
  type,
}: ModalProps) => {
  const [isSelected, setSelected] = useState(false);
  const [inputs, setInputs] = useState([]);
  const Message = require('../../assets/MessageIcon.png');

  const handleAddInput = (value) => {
    setInputs([...inputs, value]);
  };

  let title;
  let descrition;

  if (type === 'Schedule') {
    title = 'Vincular Nova Agenda';
    descrition = 'Concordo com os termos de uso.';
  } else if (type === 'Number') {
    title = 'Adicionar Novo Número';
    descrition = '';
  } else if (type === 'Account') {
    title = 'Apagar conta';
    descrition = 'Tem certeza que deseja apagar a conta?';
  }

  return (
    <S.ModalContainer transparent visible={Open}>
      <S.ModalView onPressOut={() => setOpen(false)}>
        <S.ContentContainer>
          <S.Title type={type}>{title}</S.Title>
          {type === 'Schedule' ? (
            <Input height="32px" width="278px" placeholder="nome@gmail.com" />
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
          ) : null}
          <S.ContainerDescrition>
            <S.Descrtion type={type}>{descrition}</S.Descrtion>
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
              handleAddInput(Input);
            }}
          >
            {type === 'Account' ? (
              <S.ContainerButtons>
                <Button
                  backgroundColor="#FAFAFA"
                  width="112px"
                  title="Cancelar"
                  titleColor="#FF0000"
                  borderColor="transparent"
                  hasIcon={false}
                  icon={Message}
                />
                <Button
                  backgroundColor="#FF0000"
                  width="112px"
                  title="Apagar"
                  titleColor="#FAFAFA"
                  borderColor="transparent"
                  hasIcon={false}
                  icon={Message}
                />
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
