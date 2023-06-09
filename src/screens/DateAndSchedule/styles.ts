import { theme } from '@styles/default.theme';
import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components/native';

export const Body = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${theme.colors.White};
  display: flex;
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
  color: ${theme.colors.primary.main};
  font-family: 'RobotoBold';
  margin-bottom: 8px;
`;

export const AllDescrition = styled.View`
  flex-direction: column;
  margin-bottom: 48px;
`;

export const Descrition = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 18px;
  color: ${theme.colors.highEmphasis};
  font-family: 'Roboto';
`;

export const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

export const ContainerInputDate = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  padding-left: 6px;
`;

export const InputDate = styled(TextInputMask)`
  color: ${theme.colors.highEmphasis};
  font-family: 'Roboto';
  font-style: normal;
  font-size: 20px;
  height: 100%;
`;

export const Buttons = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
