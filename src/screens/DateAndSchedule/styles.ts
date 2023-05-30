import { theme } from '@styles/default.theme';
import styled from 'styled-components/native';

export const Body = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${theme.colors.background};
  display: flex;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${theme.colors.primary.main};
  font-family: 'Roboto';
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${theme.colors.lowEmphasis};
  font-family: 'Roboto';
`;

export const Mandatory = styled.Text`
  font-size: 10px;
  color: ${theme.colors.highEmphasis};
  font-family: 'Roboto';
`;
