import { theme } from '@styles/default.theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, KeyboardAvoidingView, TextInput, View } from 'react-native';
import styled from 'styled-components/native';

type InviteProps = {
  source: string;
  selectedOption: 'presencial' | 'online';
};

export const Wrapper = styled(KeyboardAvoidingView)`
  align-items: center;
  background-color: ${theme.colors.white};
`;

export const InputsWrapper = styled(View)`
  align-items: center;
`;

export const Body = styled.View`
  display: flex;
  flex: 1;
`;

export const SpinnerWrapper = styled(View)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
`;

export const GradientBottom = styled(LinearGradient)`
  position: absolute;
  bottom: 65%;
  height: 48px;
  width: 100%;
`;

export const GradientTop = styled(LinearGradient)`
  position: absolute;
  top: 0;
  height: 80px;
  width: 100%;
`;

export const Back = styled.ImageBackground<InviteProps>`
  /* O nome da prop tem que ser source senão dá erro */
  background-image: ${(props) => `(${props.source})`};
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -100;
`;

export const Header = styled.View`
  background-color: ${theme.colors.background};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 48px 20px;
  align-items: center;
  justify-content: space-between;
  height: 70%;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const ContainerType = styled.View`
  width: 100px;
`;

export const NameEvent = styled.Text`
  font-size: 18px;
  font-family: 'RobotoBold';
  color: ${theme.colors.primary.main};
`;

export const ErrorText = styled(Text)`
  font-size: 12px;
  font-family: 'RobotoLight';
  letter-spacing: 0c.5px;
  color: red;
  align-self: flex-start;
  padding: 8px 2px;
`;
export const ErrorTitle = styled(Text)`
  font-size: 12px;
  font-family: 'RobotoLight';
  letter-spacing: 0c.5px;
  color: red;
  padding: 8px 2px;
  margin-bottom: -28px;
`;

export const ChangeName = styled.TextInput`
  font-size: 18px;
  font-family: 'RobotoBold';
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const IconBack = styled.Image`
  width: 28px;
  height: 28px;
  margin-left: 20px;
  margin-top: 48px;
`;

export const Buttons = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
`;

export const Scroll = styled.ScrollView``;

export const ContainerContent = styled.View`
  width: 288px;
  height: 128px;
  padding: 4px 8px;
  border-width: 1px;
  border: ${theme.colors.primary.main};
  border-radius: 8px;
  margin-top: 12px;
`;

export const ContainerLink = styled.View`
  width: 288px;
  height: 32px;
  border-width: 1px;
  border: ${theme.colors.primary.main};
  border-radius: 8px;
  padding: 8px;
  justify-content: center;
  margin-top: 12px;
`;

export const Content = styled(TextInput)`
  font-size: 14px;
  font-family: 'Roboto';
  color: ${theme.colors.highEmphasis};
  width: 100%;
  height: 100%;
`;
