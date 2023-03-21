import * as S from './styles';
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
};

export const ModalCard: React.FC<ModalProps> = ({
  Open,
  setOpen,
  navigation,
  screen,
}: ModalProps) => {
  const [isSelected, setSelected] = useState(false);

  return (
    <S.ModalContainer transparent visible={Open}>
      <S.ModalView onPressOut={() => setOpen(false)}>
        <S.ContentContainer>
          <S.Title>Vincular Agenda</S.Title>
          <Input height="32px" width="278px" placeholder="nome@gmail.com" />
          <S.ContainerDescriton>
            <S.Descrtion>
              Todos os meus contatos podem ver a minha agenda.
            </S.Descrtion>
            <CheckBox
              checkedIcon="check"
              uncheckedIcon="square-o"
              checkedColor="#545454"
              uncheckedColor="#545454"
              checked={isSelected}
              onPress={() => setSelected(!isSelected)}
            />
          </S.ContainerDescriton>
          <TouchableOpacity
            onPress={() => {
              if (screen) {
                navigation.navigate(screen);
              }
            }}
          >
            <Icon name="check" size={30} color="#3446E4" />
          </TouchableOpacity>
        </S.ContentContainer>
      </S.ModalView>
    </S.ModalContainer>
  );
};
