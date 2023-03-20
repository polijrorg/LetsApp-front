import * as S from './styles';
import React, { useState } from 'react';

export type InputProps = {
  width: string;
  height: string;
  placeholder: string;
  arrow: boolean;
};

const ImageArrow = require('../../assets/ArrowInput.png');

const Input: React.FC<InputProps> = ({ arrow, width, height, placeholder }) => {
  const [input, setInput] = useState('');
  console.log(input);
  return (
    <S.ContainerInput width={width} height={height}>
      <S.Input
        value={input}
        onChangeText={(texto) => setInput(texto)}
        placeholder={placeholder}
      />
      <S.ContainerArrow arrow={arrow}>
        <S.Arrow source={ImageArrow} />
      </S.ContainerArrow>
    </S.ContainerInput>
  );
};

export default Input;
