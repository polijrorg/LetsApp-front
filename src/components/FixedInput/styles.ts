import { theme } from '@styles/default.theme';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

type InputProps = {
  width: string;
  height: string;
  arrow: boolean;
};

export const ContainerInput = styled.View<InputProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 0px 10px 0px 10px;
  margin: 8px 0px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${theme.colors.primary.dark};
  background-color: ${theme.colors.white};
  flex-direction: row;
  align-items: center;
`;

export const Input = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  padding-left: 2px;
  font-family: 'Roboto';
  color: ${theme.colors.highEmphasis};
`;

export const ContainerArrow = styled.View<InputProps>`
  display: ${(props) => (props.arrow ? 'flex' : 'none')};
  width: 24px;
  height: 24px;
  margin-left: 8px;
  justify-content: center;
  align-items: center;
`;

export const Arrow = styled.Image`
  width: 14px;
  height: 7px;
`;

export const Pen = styled.Image`
  width: 20px;
  height: 20px;
`;
