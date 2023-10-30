import { theme } from '@styles/default.theme';
import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';

type InviteProps = {
  source: string;
  selectedOption: 'presencial' | 'online';
};

export const Wrapper = styled(KeyboardAvoidingView)`
  align-items: center;
  background-color: ${theme.colors.white};
`;

export const Body = styled.View`
  background-color: ${theme.colors.white};
  display: flex;
`;

export const Back = styled.ImageBackground<InviteProps>`
  /* O nome da prop tem que ser source senão dá erro */
  background-image: ${(props) => `(${props.source})`};
  height: 100%;
  width: 100%;
`;

export const Header = styled.View`
  background-color: ${theme.colors.white};
  margin-top: 75%;
  flex: 1;
  border-top-left-radius: 72px;
  border-top-right-radius: 72px;
  padding: 40px;
  align-items: center;
`;

export const ContainerType = styled.View`
  width: 100px;
`;

export const ContainerEvent = styled.View`
  flex-direction: row;
  margin-bottom: 32px;
`;

export const ContainerNameTypeP = styled.View<InviteProps>`
  background-color: ${(props) =>
    props.selectedOption === 'presencial' ? '#3446E4' : '#fff'};
  border-radius: 8px;
  /* border-width: 1px;
  border-color: ${(props) =>
    props.selectedOption === 'presencial' ? 'none' : '#949494'}; */
`;

export const ContainerNameTypeO = styled.View<InviteProps>`
  background-color: ${(props) =>
    props.selectedOption === 'online' ? '#3446E4' : '#fff'};
  border-radius: 8px;
  /* border-width: 1px;
  border-color: ${(props) =>
    props.selectedOption === 'presencial' ? 'none' : '#949494'}; */
  align-items: center;
  justify-content: center;
`;

export const NameTypeP = styled.Text<InviteProps>`
  font-size: 16px;
  font-family: 'RobotoMedium';
  color: ${(props) =>
    props.selectedOption === 'presencial' ? '#fafafa' : '#949494'};
  margin: 4px;
`;

export const NameTypeO = styled.Text<InviteProps>`
  font-size: 16px;
  font-family: 'RobotoMedium';
  color: ${(props) =>
    props.selectedOption === 'online' ? '#fafafa' : '#949494'};
  margin: 4px;
`;

export const NameEvent = styled.Text`
  font-size: 18px;
  font-family: 'RobotoBold';
  color: ${theme.colors.primary.main};
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
  width: 53px;
  height: 53px;
  margin-left: 4%;
  margin-top: 1%;
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
  padding: 8px;
  border-width: 1px;
  border: ${theme.colors.primary.main};
  border-radius: 8px;
`;

export const ContainerLink = styled.View`
  width: 288px;
  height: 32px;
  border-width: 1px;
  border: ${theme.colors.primary.main};
  border-radius: 8px;
  padding: 4px;
  justify-content: center;
  margin-top: 24px;
`;

export const Content = styled.TextInput`
  font-size: 14px;
  font-family: 'Roboto';
`;
