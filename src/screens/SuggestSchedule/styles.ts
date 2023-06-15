import { theme } from '@styles/default.theme';
import styled from 'styled-components/native';

export const Body = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${theme.colors.White};
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
  margin-bottom: 36px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${theme.colors.primary.main};
  font-family: 'RobotoBold';
`;

export const Subtitle = styled.Text`
  font-size: 20px;
  color: ${theme.colors.lowEmphasis};
  font-family: 'RobotoBold';
  margin-bottom: 8px;
`;

export const ContainerSuggest = styled.View`
  flex-direction: row;
`;

export const Buttons = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;
