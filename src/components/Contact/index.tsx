import * as S from './styles';
import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';

export type ContactProps = {
  name: string;
  phoneOrEmail: string;
  email?: string;
  onPress?: () => void;
  isDisabled?: boolean;
};

const ContactIcon = require('../../assets/Contact.png');
const InvitedContactIcon = require('../../assets/BlueUserCircle.png');

const Contact: React.FC<ContactProps> = ({
  name,
  phoneOrEmail,
  email,
  onPress,
  isDisabled,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (isSelected === false) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }

    if (onPress) {
      onPress();
    }
    // setHasBorder(!hasBorder);
    // onClick(title);
  };

  return (
    <S.ContainerContact
      onPress={handleClick}
      isSelected={!isDisabled && isSelected}
      activeOpacity={isDisabled ? 1 : 0.2}
    >
      <S.ContainerAll>
        <S.ContainerIcon>
          <S.Icon source={isDisabled ? InvitedContactIcon : ContactIcon} />
        </S.ContainerIcon>
        <S.Data>
          <S.Name>{name}</S.Name>
          <S.PhoneOrEmail>{phoneOrEmail}</S.PhoneOrEmail>
          <S.PhoneOrEmail>{email}</S.PhoneOrEmail>
        </S.Data>
      </S.ContainerAll>
      {!isDisabled && isSelected ? (
        <CheckBox
          checkedIcon="check"
          uncheckedIcon="square-o"
          checkedColor="#3446E4"
          uncheckedColor="#3446E4"
          checked={isPressed}
          onPress={() => setIsPressed(!isPressed)}
          disabled={isDisabled}
        />
      ) : null}
    </S.ContainerContact>
  );
};

export default Contact;
