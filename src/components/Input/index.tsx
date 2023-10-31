import * as S from './styles';
import { theme } from '@styles/default.theme';
import React from 'react';

export type InputProps = {
  width: string;
  height: string;
  placeholder: string;
  arrow?: boolean;
  pencil?: boolean;
  value?: string;
  onChange?: (text: string) => void;
  keyboardType?: string;
  editable?: boolean;
  ref?: React.MutableRefObject<any>;
};

const ImageArrow = require('../../assets/ArrowInput.png');
const ImagePen = require('../../assets/Pen.png');

const Input: React.FC<InputProps> = ({
  arrow = false,
  pencil = false,
  width,
  height,
  placeholder,
  value,
  onChange,
  keyboardType,
  editable = true,
  ref,
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
        ref={ref}
      />
      <S.ContainerArrow arrow={arrow}>
        <S.Arrow source={ImageArrow} />
      </S.ContainerArrow>
      <S.ContainerArrow arrow={pencil}>
        <S.Pen source={ImagePen} />
      </S.ContainerArrow>
    </S.ContainerInput>
  );
};

export default Input;
