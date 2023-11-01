import * as S from './styles';
import React from 'react';

export type ButtonProps = {
  width: string;
  hasIcon: boolean;
  icon?: string;
  backgroundColor: string;
  title: string;
  titleColor: string;
  borderColor: string;
  countDown?: boolean;
  secondsLeft?: number;
};

const Button: React.FC<ButtonProps> = ({
  width,
  hasIcon = false,
  icon,
  backgroundColor,
  title,
  titleColor,
  borderColor,
  countDown,
  secondsLeft,
}) => {
  return (
    <S.ContainerButton
      width={width}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      <S.ContainerAll>
        <S.ContainerIcon hasIcon={hasIcon} countdown={countDown}>
          {countDown ? (
            <S.Title titleColor={titleColor}>{`(${secondsLeft})`}</S.Title>
          ) : (
            <S.Icon source={icon} />
          )}
        </S.ContainerIcon>
        <S.Title titleColor={titleColor}>{title}</S.Title>
      </S.ContainerAll>
    </S.ContainerButton>
  );
};

export default Button;
