import * as S from './styles';
import Event from '@interfaces/Events';
import moment from 'moment';
import 'moment/locale/pt-br';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export type CardsInviteProps = {
  navigation: any;
  route: any;
};

const IconArrow = require('../../assets/ArrowBackBlue.png');
const Office = require('../../assets/OfficeII.png');
const online = require('../../assets/OnlineEvent.png');
const presencial = require('../../assets/PresencialEvent.png');
const calendar = require('../../assets/CalendarIcon.png');
const Participants = require('../../assets/Participants.png');

const ScreenEvent: React.FC<CardsInviteProps> = ({ route, navigation }) => {
  const event: Event = route.params.event;

  const totalGuests = event.yes.amount + event.no.amount + event.maybe.amount;

  const ajustDate = moment(event.element.begin).format('DD/MM/YYYY');
  const formattedDate = moment(ajustDate, 'DD/MM/YYYY')
    .locale('pt-br')
    .format('ddd');

  return (
    <S.Body>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainScreen');
        }}
      >
        <S.IconBack source={IconArrow} />
      </TouchableOpacity>
      <S.ContainerInfo>
        <S.Image source={Office} />
        <S.Name>{event.element.name}</S.Name>
        <S.ContainerContent>
          <S.Row>
            <S.ContainerIcon>
              <S.IconAdress
                source={event.element.address ? presencial : online}
              />
            </S.ContainerIcon>
            <S.Adjust>
              <S.LocalandDate>São Paulo - SP</S.LocalandDate>
              <S.Adress>{event.element.address || 'Evento online'}</S.Adress>
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
                {moment(event.element.begin).format('HH:mm')} -{' '}
                {moment(event.element.end).format('HH:mm')}
              </S.Date>
            </S.Adjust>
          </S.Row>
          <S.Row>
            <S.ContainerIcon>
              <S.IconDate source={Participants} />
            </S.ContainerIcon>
            <S.Adjust>
              <S.LocalandDate>
                {totalGuests} {totalGuests === 1 ? ' Convidado' : 'Convidados'}
              </S.LocalandDate>
              <S.Confirmed>{event.yes.amount}: Sim</S.Confirmed>
            </S.Adjust>
            <S.InfoButton
              onPress={() => navigation.navigate('InvitedGuests', { event })}
            >
              <S.InfoText>MAIS INFORMAÇÕES</S.InfoText>
            </S.InfoButton>
          </S.Row>
        </S.ContainerContent>
        <S.Content>{event.element.description}</S.Content>
      </S.ContainerInfo>
    </S.Body>
  );
};

export default ScreenEvent;
