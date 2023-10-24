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
  const [isMandatory, setIsMandatory] = useState(false);

  const handleClick = () => {
    if (isSelected) {
      setIsSelected(false);
      setIsMandatory(true);
    } else if (isMandatory) {
      setIsSelected(false);
      setIsMandatory(false);
    } else {
      setIsSelected(true);
      setIsMandatory(false);
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
      isSelected={(!isDisabled && isSelected) || isMandatory}
      activeOpacity={isDisabled ? 1 : 0.2}
    >
      <S.ContentWrapper>
        <S.Icon source={isDisabled ? InvitedContactIcon : ContactIcon} />
        <S.Data>
          <S.Name>{name}</S.Name>
          <S.PhoneOrEmail>{phoneOrEmail}</S.PhoneOrEmail>
          {email ? <S.PhoneOrEmail>{email}</S.PhoneOrEmail> : <></>}
        </S.Data>
      </S.ContentWrapper>
      {!isDisabled && (isSelected || isMandatory) ? (
        <CheckBox
          checkedIcon="check"
          uncheckedIcon="square-o"
          checkedColor="#3446E4"
          uncheckedColor="#3446E4"
          checked={isMandatory}
          disabled={isDisabled}
        />
      ) : null}
    </S.ContainerContact>
  );
};

export default Contact;
