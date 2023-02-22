import { theme } from '@styles/default.theme';
import styled from 'styled-components/native';

export const Body = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  background-color: ${theme.colors.primary.main};
`;
