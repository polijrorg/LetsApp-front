import { theme } from '@styles/default.theme';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Body = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(39, 39, 39, 0.8);
`;

export const ModalView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.white};
  width: 336px;
  border-radius: 24px;
  padding: 20px 24px;
  padding-top: 32px;
  z-index: 15;
`;

export const ConfirmButton = styled(TouchableOpacity)`
  padding: 8px;
`;

export const Title = styled(Text)`
  font-size: 20px;
  color: ${theme.colors.primary.main};
  font-weight: 700;
  margin-bottom: 5%;
`;

export const IconBack = styled.Image`
  width: 28px;
  height: 28px;
`;

export const BackButton = styled(TouchableOpacity)`
  position: absolute;
  top: 32px;
  left: 20px;
`;
