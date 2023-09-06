import * as S from './styles';
import { theme } from '@styles/default.theme';
import React from 'react';

export type InputProps = {
  width: string;
  height: string;
  placeholder: string;
  arrow?: boolean;
  value?: string;
  onChange?: (text: string) => void;
  keyboardType?: string;
  editable?: boolean;
};

const ImageArrow = require('../../assets/ArrowInput.png');

const Input: React.FC<InputProps> = ({
  arrow = false,
  width,
  height,
  placeholder,
  value,
  onChange,
  keyboardType,
  editable = true,
}) => {
  return (
    <S.ContainerInput width={width} height={height}>
      <S.Input
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.mediumEmphasis}
        keyboardType={keyboardType}
        editable={editable}
      />
      <S.ContainerArrow arrow={arrow}>
        <S.Arrow source={ImageArrow} />
      </S.ContainerArrow>
    </S.ContainerInput>
  );
};

export default Input;
