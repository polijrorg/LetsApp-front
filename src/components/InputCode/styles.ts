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
  justify-content: center;
`;

export const Input = styled.TextInput`
  font-size: 26px;
  font-family: 'Roboto';
  letter-spacing: 12px;
  padding-left: 12px;
  text-align: center;
`;
