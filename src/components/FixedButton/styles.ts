import { theme } from '@styles/default.theme';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

type ButtonProps = {
  width?: string;
  hasIcon?: boolean;
};

export const ContainerButton = styled(TouchableOpacity)<ButtonProps>`
  width: ${(props) => props.width};
  height: 36px;
  margin-bottom: 8px;
  border-radius: 8px;
  border-width: 1px;
  background-color: ${theme.colors.primary.dark};
  justify-content: center;
  align-items: center;
`;

export const ContainerAll = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${theme.colors.white};
  font-size: 16px;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  font-family: 'Roboto';
`;

export const ContainerIcon = styled.View<ButtonProps>`
  display: ${(props) => (props.hasIcon ? 'flex' : 'none')};
  margin-right: 16px;
  width: 16px;
  height: 16px;
`;

export const Icon = styled.Image`
  width: 16px;
  height: 16px;
`;
