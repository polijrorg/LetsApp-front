import { theme } from '@styles/default.theme';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

type InviteProps = {
  source: string;
};

export const Body = styled(View)`
  flex: 1;
  background-color: ${theme.colors.background};
  display: flex;
`;

export const GradientTop = styled(LinearGradient)`
  position: absolute;
  top: 0;
  height: 150px;
  width: 100%;
`;

export const GradientBottom = styled(LinearGradient)`
  position: absolute;
  bottom: 65%;
  height: 136px;
  width: 100%;
`;

export const Header = styled(SafeAreaView)`
  width: 100%;
`;

export const Back = styled.ImageBackground<InviteProps>`
  /* O nome da prop tem que ser source senão dá erro */
  background-image: ${(props) => `(${props.source})`};
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const InfoWrapper = styled(View)`
  background-color: ${theme.colors.background};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 20px;
  align-items: center;
  height: 70%;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const IconBack = styled.Image`
  width: 28px;
  height: 28px;
  margin-left: 20px;
  margin-top: 16px;
`;

export const Image = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 12px;
  color: blue;
`;

export const ContainerContent = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const InfoContent = styled(View)`
  width: 100%;
  margin: 16px 0px;
`;

export const Name = styled(Text)`
  font-size: 16px;
  font-family: 'Roboto';
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

export const Title = styled(Text)`
  font-size: 18px;
  color: ${theme.colors.white};
  font-family: 'RobotoBold';
  position: absolute;
  bottom: 70%;
  padding-bottom: 12px;
  left: 24px;
  z-index: 10;
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
  margin-top: 24px;
`;

export const Row = styled(View)`
  flex-direction: row;
  width: 100%;
  margin: 4px 0px;
`;

export const ScheduleText = styled(Text)`
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  color: ${theme.colors.lowEmphasis};
  font-family: 'RobotoBold';
  width: 100px;
  text-align: center;
`;

export const ScheduleButton = styled(TouchableOpacity)`
  position: absolute;
  right: 8px;
  top: 6px;
  text-align: center;
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

export const AvailabilityText = styled(Text)<{ available: boolean }>`
  font-size: 8px;
  color: ${(props) =>
    props.available
      ? `${theme.colors.primary.main}`
      : `${theme.colors.primary.negative}`};
`;

export const Line = styled(View)`
  width: 100%;
  border-bottom-width: 2px;
  border-bottom-color: ${theme.colors.divider};
`;

export const Buttons = styled(SafeAreaView)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
`;

export const ContainerDescrition = styled(View)`
  width: 100%;
  margin: 16px 0px;
`;

export const Description = styled(Text)`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1.25px;
  font-family: 'RobotoBold';
  text-transform: uppercase;
  color: ${theme.colors.primary.dark};
  margin: 8px 0px;
`;

export const Scroll = styled.ScrollView`
  height: 200px;
`;

export const Content = styled(Text)`
  font-size: 12px;
  font-family: 'Roboto';
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${theme.colors.mediumEmphasis};
`;
