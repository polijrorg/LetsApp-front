import * as S from './styles';
import Button from '@components/Button';
import useAuth from '@hooks/useAuth';
import Invite from '@interfaces/Invites';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserServices from '@services/UserServices';
import moment from 'moment';
// import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export type CardsInviteProps = {
  event: 'online' | 'presencial';
  navigation: any;
  route: any;
};

const IconArrow = require('../../assets/ArrowBackWhite.png');
const Office = require('../../assets/Office.png');
const online = require('../../assets/OnlineEvent.png');
const presencial = require('../../assets/PresencialEvent.png');
const calendar = require('../../assets/CalendarIcon.png');

const ScreenInvite: React.FC<CardsInviteProps> = ({ route, navigation }) => {
  const invite: Invite = route.params.invite;
  const location = route.params.location;
  const [acceptanceState, setAcceptanceState] = useState<string | null>(null);
  const { user } = useAuth();

  const getAcceptanceState = async (): Promise<void> => {
    const acceptance = await AsyncStorage.getItem(
      `@acceptanceState${invite.element.id}`
    );
    setAcceptanceState(acceptance);
  };

  useEffect(() => {
    const getAvailability = async () => {
      const response = await UserServices.checkUserAvailability({
        id: user.id,
        inviteId: invite.element.id,
      });

      setIsAvailable(response);
      setIsLoading(false);
    };

    getAcceptanceState();
    getAvailability();
  });

  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const ajustDate = moment(invite.element.begin).format('DD/MM/YYYY');
  const formattedDate = moment(ajustDate, 'DD/MM/YYYY')
    .locale('pt-br')
    .format('ddd');

  const handleAcceptance = async (state: string) => {
    console.log('entrou handle');
    await UserServices.updateInviteState({
      state,
      email: user.email,
      inviteId: invite.element.id,
    });

    setAcceptanceState(state);
    await AsyncStorage.setItem(`@acceptanceState${invite.element.id}`, state);

    setTimeout(() => {
      navigation.navigate('MainScreen');
    }, 1500);
  };

  return (
    <S.Body>
      <S.Back source={Office}>
        <S.GradientTop colors={['black', 'transparent']} />
        <S.Header>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainScreen');
            }}
          >
            <S.IconBack source={IconArrow} />
          </TouchableOpacity>
        </S.Header>
        <S.Title>{invite.element.name}</S.Title>
        <S.GradientBottom colors={['transparent', 'black']} />
        <S.InfoWrapper>
          <S.ContainerContent>
            {invite.element.organizerPhoto ? (
              <S.Image source={{ uri: invite.element.organizerPhoto }} />
            ) : (
              <S.Image source={require('../../assets/UserCircle.png')} />
            )}
            <S.Name>Convidado por {invite.element.organizerName}</S.Name>
          </S.ContainerContent>
          <S.InfoContent>
            <S.Row>
              <S.ContainerIcon>
                <S.IconAdress
                  source={location === 'online' ? online : presencial}
                />
              </S.ContainerIcon>
              <S.Adjust>
                <S.LocalandDate>São Paulo - SP</S.LocalandDate>
                <S.Adress>{invite.element.address}</S.Adress>
              </S.Adjust>
            </S.Row>
            <S.Row>
              <S.ContainerIcon>
                <S.IconDate source={calendar} />
              </S.ContainerIcon>
              <S.Adjust>
                <S.LocalandDate>
                  {formattedDate.replace(/^\w/, (c) => c.toUpperCase())} -{' '}
                  {ajustDate.substring(0, 5)}
                </S.LocalandDate>
                <S.Date>
                  {moment(invite.element.begin).format('HH:mm')} -{' '}
                  {moment(invite.element.end).format('HH:mm')}
                </S.Date>
                {!isLoading && (
                  <S.AvailabilityText available={isAvailable}>
                    {`${
                      isAvailable
                        ? 'Você está disponível nesse horário'
                        : 'Você não está disponível nesse horário'
                    }`}
                  </S.AvailabilityText>
                )}
              </S.Adjust>
              <S.ScheduleButton
                onPress={() => {
                  navigation.navigate('SuggestNewTime', { invite: invite });
                }}
              >
                <S.ScheduleText>Modificar o horário</S.ScheduleText>
              </S.ScheduleButton>
            </S.Row>
          </S.InfoContent>
          <S.Line />
          <S.ContainerDescrition>
            <S.Description>Descrição</S.Description>
            <S.Content>{invite.element.description}</S.Content>
          </S.ContainerDescrition>
          <S.Buttons>
            {acceptanceState === 'declined' ? (
              <S.StateText color="#949494">Convite recusado</S.StateText>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleAcceptance('declined')}
              >
                <Button
                  width="136px"
                  backgroundColor="#FAFAFA"
                  borderColor="#949494"
                  hasIcon={false}
                  icon={Office}
                  title="Recusar"
                  titleColor="#949494"
                />
              </TouchableOpacity>
            )}
            {acceptanceState === 'accepted' ? (
              <S.StateText color="#3446E4">Convite aceito</S.StateText>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleAcceptance('accepted')}
              >
                <Button
                  width="136px"
                  backgroundColor="#3446E4"
                  borderColor="transparent"
                  hasIcon={false}
                  icon={Office}
                  title="Aceitar"
                  titleColor="#FAFAFA"
                />
              </TouchableOpacity>
            )}
          </S.Buttons>
        </S.InfoWrapper>
      </S.Back>
    </S.Body>
  );
};

export default ScreenInvite;
