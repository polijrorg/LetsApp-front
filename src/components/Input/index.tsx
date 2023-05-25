import * as S from './styles';
import React from 'react';

export type InputProps = {
  width: string;
  height: string;
  placeholder: string;
  arrow?: boolean;
  value?: string;
  onChange?: (text: string) => void;
  keyboardType?: string;
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
}) => {
  return (
    <S.ContainerInput width={width} height={height}>
      <S.Input
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
      <S.ContainerArrow arrow={arrow}>
        <S.Arrow source={ImageArrow} />
      </S.ContainerArrow>
    </S.ContainerInput>
  );
};

export default Input;
