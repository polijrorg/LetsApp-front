import { theme } from '@styles/default.theme';
import { View } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  selected?: boolean;
}

export const Wrapper = styled(View)`
  width: 100%;
  height: 92px;
  flex-direction: row;
  justify-content: space-between;
`;

export const DayWrapper = styled(View)<Props>`
  width: 18%;
  height: 100%;
  border-radius: 12px;
  background-color: ${({ selected }) =>
    selected ? theme.colors.primary.dark : theme.colors.primary.main};
`;
