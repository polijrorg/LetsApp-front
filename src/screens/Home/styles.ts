import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.blue};
`;

export const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  margin-top: 32px;
`;
