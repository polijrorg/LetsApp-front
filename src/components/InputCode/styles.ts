import { theme } from '@styles/default.theme';
import styled from 'styled-components/native';

type InputProps = {
  width: string;
  height: string;
};

export const ContainerInput = styled.View<InputProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 0px 10px 0px 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.highEmphasis};
  background-color: ${theme.colors.White};
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 26px;
  letter-spacing: 20px;
  font-family: 'Roboto';
`;
