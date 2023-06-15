import { theme } from '@styles/default.theme';
import styled from 'styled-components/native';

export const Body = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  display: flex;
`;

export const Header = styled.View`
  background-color: ${theme.colors.background};
  flex: 1;
  border-top-left-radius: 48px;
  border-top-right-radius: 48px;
  padding: 20px;
`;

export const IconBack = styled.Image`
  width: 53px;
  height: 53px;
  margin-left: 4%;
  margin-top: 1%;
`;

export const ContainerImage = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 351px;
  height: 113px;
`;

export const ContainerContent = styled.View`
  width: 100%;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-family: 'RobotoBold';
`;

export const Adress = styled.Text`
  font-size: 12px;
  color: ${theme.colors.mediumEmphasis};
  margin-bottom: 6px;
  font-family: 'Roboto';
`;

export const IconAdress = styled.Image`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: ${theme.colors.mediumEmphasis};
  margin-bottom: 6px;
  font-family: 'Roboto';
`;

export const Confirmed = styled.Text`
  font-size: 12px;
  color: ${theme.colors.primary.main};
  margin-bottom: 6px;
  font-family: 'Roboto';
`;

export const ContainerIcon = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 16px;
  margin-right: 8px;
  margin-bottom: 8px;
`;
export const IconDate = styled.Image`
  width: 24px;
  height: 24px;
`;

export const Column = styled.View`
  margin-right: 20%;
  margin-top: 24px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Schedule = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  color: ${theme.colors.lowEmphasis};
  font-family: 'Roboto';
`;

export const LocalandDate = styled.Text`
  font-size: 12px;
  color: ${theme.colors.lowEmphasis};
  font-family: 'Roboto';
`;

export const Adjust = styled.View`
  flex-direction: column;
`;

export const Line = styled.View`
  width: 100%;
  height: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.lowEmphasis};
  margin-bottom: 8px;
`;

export const Scroll = styled.ScrollView`
  height: 200px;
`;

export const Content = styled.Text`
  font-size: 14px;
  font-family: 'Roboto';
`;
