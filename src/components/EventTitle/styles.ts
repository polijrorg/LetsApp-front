import { theme } from '@styles/default.theme';
import { View, Image, TextInput } from 'react-native';
import styled from 'styled-components/native';

export const TitleWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.divider};
  border-bottom-style: solid;
`;

export const Title = styled(TextInput)`
  font-family: 'RobotoBold';
  font-size: 16px;
  color: ${theme.colors.primary.main};
`;

export const Icon = styled(Image)`
  height: 20px;
  width: 20px;
  margin-left: 24px;
`;
