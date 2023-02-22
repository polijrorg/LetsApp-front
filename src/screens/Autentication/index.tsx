import * as S from './styles';
import Button from '@components/Button';
import React from 'react';

const Message = require('../../assets/MessageIcon.png');

const Autentication: React.FC = ({}) => {
  return (
    <S.Body>
      <S.Title>Achievements</S.Title>
      <Button
        width="144px"
        backgroundColor="#3446E4"
        borderColor="transparent"
        hasIcon={false}
        icon={Message}
        title="Continuar"
        titleColor="#FAFAFA"
      />
    </S.Body>
  );
};

export default Autentication;
