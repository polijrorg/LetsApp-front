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
  setValue?: (value: string) => void;
  keyboardType?: string;
  editable?: boolean;
};

const ImageArrow = require('../../assets/ArrowInput.png');
const ImagePen = require('../../assets/Pen.png');

const FixedInput: React.FC<InputProps> = ({
  arrow = false,
  pencil = false,
  width,
  height,
  placeholder,
  value,
  setValue,
  keyboardType,
  editable = true,
}) => {
  return (
    <S.ContainerInput width={width} height={height}>
      <S.Input
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.mediumEmphasis}
        keyboardType={keyboardType}
        editable={editable}
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

export default FixedInput;
