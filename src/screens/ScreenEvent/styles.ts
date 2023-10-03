import { theme } from '@styles/default.theme';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export const Body = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background};
  display: flex;
`;

export const Header = styled(View)`
  background-color: ${theme.colors.background};
  flex: 1;
  border-top-left-radius: 48px;
  border-top-right-radius: 48px;
  padding: 20px;
`;

export const IconBack = styled.Image`
  width: 28px;
  height: 28px;
  margin-left: 20px;
`;

export const ContainerInfo = styled(View)`
  width: 100%;
  padding: 20px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 120px;
  border-radius: 8px;
`;

export const ContainerContent = styled(View)`
  width: 100%;
`;

export const Name = styled(Text)`
  font-size: 18px;
  font-family: 'RobotoBold';
  color: ${theme.colors.highEmphasis};
  padding: 16px 0px;
`;

export const Adress = styled(Text)`
  font-size: 12px;
  color: ${theme.colors.highEmphasis};
  font-family: 'Roboto';
  letter-spacing: 0.55px;
  line-height: 24px;
`;

export const IconAdress = styled.Image`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const Date = styled(Text)`
  font-size: 12px;
  color: ${theme.colors.mediumEmphasis};
  margin-bottom: 6px;
  font-family: 'Roboto';
`;

export const Confirmed = styled(Text)`
  font-size: 12px;
  color: ${theme.colors.primary.main};
  margin-bottom: 6px;
  font-family: 'Roboto';
`;

export const ContainerIcon = styled(View)`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 16px;
  margin: 2px 12px 2px 0px;
`;
export const IconDate = styled.Image`
  width: 24px;
  height: 24px;
`;

export const Column = styled(View)`
  margin-right: 20%;
  margin-top: 24px;
`;

export const Row = styled(View)`
  flex-direction: row;
  width: 100%;
  margin: 4px 0px;
`;

export const Schedule = styled(Text)`
  font-size: 12px;
  text-transform: uppercase;
  color: ${theme.colors.lowEmphasis};
  font-family: 'Roboto';
`;

export const LocalandDate = styled(Text)`
  font-size: 12px;
  color: ${theme.colors.lowEmphasis};
  font-family: 'RobotoLight';
  letter-spacing: 0.25px;
  line-height: 20px;
`;

export const Adjust = styled(View)`
  flex-direction: column;
  justify-content: space-between;
`;

export const Line = styled(View)`
  width: 100%;
  height: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.lowEmphasis};
  margin-bottom: 8px;
`;

export const Scroll = styled.ScrollView`
  height: 200px;
`;

export const Content = styled(Text)`
  font-size: 14px;
  font-family: 'Roboto';
  margin-top: 12px;
`;

export const InfoText = styled(Text)`
  font-size: 12px;
  font-family: 'RobotoBold';
  color: ${theme.colors.lowEmphasis};
  line-height: 16px;
  letter-spacing: 1.25px;
`;

export const InfoButton = styled(TouchableOpacity)`
  position: absolute;
  right: 8px;
  top: 12px;
`;
