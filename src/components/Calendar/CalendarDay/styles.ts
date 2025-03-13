import { theme } from '@styles/default.theme';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  selected?: boolean;
}

export const DayWrapper = styled(View)<Props>`
  width: 17%;
  height: 100%;
  border-radius: 12px;
  background-color: ${({ selected }) =>
    selected ? theme.colors.primary.dark : theme.colors.primary.main};
  align-items: center;
  justify-content: space-around;
  padding: 12px 0px;
`;

export const WeekText = styled(Text)`
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.25px;
  font-family: 'RobotoLight';
  color: ${theme.colors.white};
`;

export const DayText = styled(Text)`
  font-size: 20px;
  font-family: 'RobotoBold';
  color: ${theme.colors.white};
`;
