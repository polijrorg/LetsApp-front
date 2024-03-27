import * as S from './styles';
import React from 'react';

export type InputProps = {
  width: string;
  height: string;
  placeholder: string;
  value?: string;
  onChange?: (text: string) => void;
  keyboardType?: 'numeric' | null;
};

const InputCode: React.FC<InputProps> = ({
  width,
  height,
  placeholder,
  value,
  onChange,
  keyboardType,
}) => {
  const MAX_LENGTH = 6;

  function handleChangeText(newText) {
    if (newText.length <= MAX_LENGTH) {
      onChange(newText);
    }
  }

  return (
    <S.ContainerInput width={width} height={height}>
      <S.Input
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor="#BCD1FB"
        keyboardType={keyboardType}
      />
    </S.ContainerInput>
  );
};

export default InputCode;
