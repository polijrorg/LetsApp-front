import { theme } from '@styles/default.theme';
import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(KeyboardAvoidingView)`
  align-items: center;
  background-color: ${theme.colors.white};
`;

export const Body = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${theme.colors.white};
  align-items: center;
`;

export const Logo = styled.Image`
  width: 121px;
  height: 119px;
`;

export const Title = styled.Text`
  font-size: 48px;
  color: ${theme.colors.primary.main};
  font-family: 'Roboto';
`;

export const Description = styled.Text`
  text-align: center;
  font-family: 'Roboto';
  font-size: 16px;
  color: ${theme.colors.highEmphasis};
  margin-top: 16px;
  margin-bottom: 42px;
`;

export const ContainerInputs = styled.View`
  flex-direction: row;
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

export const Spacer = styled.View`
  width: 8px;
`;

export const Content = styled.View`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
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
  margin: -10px 0px 10px 0px;
  font-family: 'Roboto';
`;

export const Errors = styled.View`
  flex-direction: column;
  align-items: center;
`;

type InputProps = {
  width: string;
  height: string;
  arrow: boolean;
};

export const ContainerInput = styled.View<InputProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 0px 10px 0px 10px;
  margin: 8px 0px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${theme.colors.primary.dark};
  background-color: ${theme.colors.white};
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'Roboto';
`;

export const ContainerArrow = styled.View<InputProps>`
  display: ${(props) => (props.arrow ? 'flex' : 'none')};
  width: 24px;
  height: 24px;
  margin-left: 8px;
  justify-content: center;
  align-items: center;
`;

export const Arrow = styled.Image`
  width: 14px;
  height: 7px;
`;

export const Pen = styled.Image`
  width: 20px;
  height: 20px;
`;
