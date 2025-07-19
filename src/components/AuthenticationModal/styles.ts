import { theme } from '@styles/default.theme';
import { Modal, TouchableOpacity,StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const ModalContainer = styled(Modal)``;

export const ModalView = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(39, 39, 39, 0.8);
`;

export const ContentContainer = styled.View`
  width: 336px;
  border-radius: 24px;
  padding: 20px;
  background-color: ${theme.colors.white};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${theme.colors.primary.main};
  font-family: 'RobotoBold';
  margin-bottom: 16px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${theme.colors.highEmphasis};
  font-family: 'Roboto';
  margin-bottom: 16px;
`;

export const Input = styled.View`
  width: 296px;
  height: 32px;
  border-width: 1px;
  border-color: ${theme.colors.lowEmphasis};
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const ImageCalendars = styled.Image`
  width: 24px;
  height: 24px;
`;

export const NameCalendar = styled.Text`
  font-size: 18px;
  color: ${theme.colors.highEmphasis};
  font-family: 'RobotoBold';
`;

export const DescritionBottom = styled.Text`
  font-size: 12px;
  color: ${theme.colors.primary.main};
  font-family: 'Roboto';
  margin-top: 8px;
`;

export const ContainerButtons = styled.View`
  flex-direction: column;
`;
export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
    lineHeight: 22,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.lowEmphasis, 
    borderStartStartRadius: 8,
    borderStartEndRadius: 8,
    borderEndStartRadius: 8,
    borderEndEndRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,   }

  },
  googleButton: {
  },
  outlookButton: {
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    color: '#666',
  },
});

