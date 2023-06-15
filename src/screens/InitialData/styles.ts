import { theme } from '@styles/default.theme';
import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(KeyboardAvoidingView)`
  align-items: center;
  background-color: ${theme.colors.White};
`;

export const Body = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${theme.colors.White};
  align-items: center;
`;

export const Logo = styled.Image`
  width: 121px;
  height: 119px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: ${theme.colors.primary.main};
  font-family: 'Roboto';
`;

export const Descrition = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${theme.colors.highEmphasis};
  margin-top: 16px;
  margin-bottom: 32px;
  font-family: 'Roboto';
`;

export const Gallery = styled.Image`
  width: 90px;
  height: 90px;
  margin-bottom: 16px;
  border-radius: 180px;
`;

export const Empty = styled.View`
  width: 0px;
  height: 0px;
  margin-bottom: 24px;
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

export const TextError = styled.Text`
  color: #ff375b;
  margin: -4px 0px -12px 0px;
  font-family: 'Roboto';
`;

export const Errors = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.View`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
