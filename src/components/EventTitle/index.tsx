import * as S from './styles';
import { theme } from '@styles/default.theme';
import React from 'react';

interface Props {
  title: string;
  setTitle: (title: string) => void;
}

const EventTitle: React.FC<Props> = ({ title, setTitle }) => {
  return (
    <S.TitleWrapper>
      <S.Title
        placeholder="Nome do Evento"
        placeholderTextColor={theme.colors.primary.main}
        onChangeText={(value) => setTitle(value)}
        value={title}
      />
      <S.Icon source={require('../../assets/Pen.png')} />
    </S.TitleWrapper>
  );
};

export default EventTitle;
