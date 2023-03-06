import * as S from './styles';
import React, { useState } from 'react';

export type InputProps = {
  width: string;
  height: string;
  placeholder: string;
};

const InputCode: React.FC<InputProps> = ({ width, height, placeholder }) => {
  const MAX_LENGTH = 6;
  const [input, setInput] = useState('');

  function handleChangeText(newText) {
    if (newText.length <= MAX_LENGTH) {
      setInput(newText);
    }
  }

  return (
    <S.ContainerInput width={width} height={height}>
      <S.Input
        value={input}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor="#BCD1FB"
      />
    </S.ContainerInput>
  );
};

export default InputCode;
