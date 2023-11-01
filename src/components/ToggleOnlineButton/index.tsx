import * as S from './styles';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface Props {
  online: boolean;
  setOnline: (online: boolean) => void;
}

const ToggleOnlineButton: React.FC<Props> = ({ online, setOnline }) => {
  return (
    <S.ContainerEvent>
      <TouchableOpacity onPress={() => setOnline(false)}>
        <S.ContainerNameTypeP online={online}>
          <S.NameTypeP online={online}>Presencial</S.NameTypeP>
        </S.ContainerNameTypeP>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setOnline(true)}>
        <S.ContainerNameTypeO online={online}>
          <S.NameTypeO online={online}> Online</S.NameTypeO>
        </S.ContainerNameTypeO>
      </TouchableOpacity>
    </S.ContainerEvent>
  );
};

export default ToggleOnlineButton;
