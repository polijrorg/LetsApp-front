import { theme } from '@styles/default.theme';
import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';

export const Body = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${theme.colors.white};
  align-items: center;
`;

export const Wrapper = styled(KeyboardAvoidingView)`
  align-items: center;
  background-color: ${theme.colors.white};
`;

export const Logo = styled.Image`
  width: 121px;
  height: 119px;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  margin-bottom: 10%;
`;

export const TitleI = styled.Text`
  color: ${theme.colors.primary.main};
  font-size: 32px;
  line-height: 38px;
  font-family: 'Roboto';
`;

export const TitleII = styled.Text`
  color: ${theme.colors.primary.dark};
  font-size: 32px;
  line-height: 38px;
  font-family: 'Roboto';
`;

export const Descrition = styled.Text`
  text-align: center;
  font-size: 16px;
  font-family: 'Roboto';
  color: ${theme.colors.highEmphasis};
  margin-top: 8px;
  margin-bottom: 32px;
`;

export const SmallCircleLeft = styled.View`
  width: 208px;
  height: 208px;
  border-radius: 30000px;
  position: absolute;
  bottom: -120px;
  left: -120px;
  background-color: ${theme.colors.primary.main};
`;

export const SmallCircleRight = styled.View`
  width: 208px;
  height: 208px;
  border-radius: 30000px;
  position: absolute;
  top: -104px;
  right: -104px;
  background-color: ${theme.colors.primary.main};
`;

export const SmallTop = styled.View`
  width: 104px;
  height: 104px;
  border-radius: 30000px;
  position: absolute;
  top: -54px;
  right: 72px;
  background-color: ${theme.colors.primary.light};
`;

export const Content = styled.View`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
