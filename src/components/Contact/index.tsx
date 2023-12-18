import * as S from './styles';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

export type ContactProps = {
  name: string;
  phoneOrEmail: string;
  email?: string;
  onPress?: () => void;
  onPressMandatory?: () => void;
  isDisabled?: boolean;
  isSelected?: boolean;
  isMandatory?: boolean;
};

const ContactIcon = require('../../assets/Contact.png');
const InvitedContactIcon = require('../../assets/BlueUserCircle.png');

const Contact: React.FC<ContactProps> = ({
  name,
  phoneOrEmail,
  email,
  onPress,
  onPressMandatory,
  isDisabled = false,
  isSelected,
  isMandatory,
}) => {
  return (
    <S.ContainerContact
      onPress={onPress}
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
          onPress={onPressMandatory}
        />
      ) : null}
    </S.ContainerContact>
  );
};

export default Contact;
