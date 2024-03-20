import * as S from './styles';
import React from 'react';
import { GestureResponderEvent } from 'react-native';

export type ButtonProps = {
  width: string;
  hasIcon?: boolean;
  icon?: any;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const FixedButton: React.FC<ButtonProps> = ({
  width,
  hasIcon = false,
  icon,
  title,
  onPress,
}) => {
  return (
    <S.ContainerButton width={width} onPress={onPress}>
      <S.ContainerAll>
        <S.ContainerIcon hasIcon={hasIcon}>
          <S.Icon source={icon} />
        </S.ContainerIcon>
        <S.Title>{title}</S.Title>
      </S.ContainerAll>
    </S.ContainerButton>
  );
};

export default FixedButton;
