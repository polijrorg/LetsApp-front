import * as S from './styles';
import Button from '@components/Button';
import Invite from '@interfaces/Invites';
import moment from 'moment';
// import moment from 'moment';
import 'moment/locale/pt-br';
import React from 'react';
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

  const ajustDate = moment(invite.element.begin).format('DD/MM/YYYY');
  const formattedDate = moment(ajustDate, 'DD/MM/YYYY')
    .locale('pt-br')
    .format('ddd');

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
              </S.Adjust>
              <S.ScheduleButton>
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
            <Button
              width="136px"
              backgroundColor="#FAFAFA"
              borderColor="#949494"
              hasIcon={false}
              icon={Office}
              title="Recusar"
              titleColor="#949494"
            />
            <Button
              width="136px"
              backgroundColor="#3446E4"
              borderColor="transparent"
              hasIcon={false}
              icon={Office}
              title="Aceitar"
              titleColor="#FAFAFA"
            />
          </S.Buttons>
        </S.InfoWrapper>
      </S.Back>
    </S.Body>
  );
};

export default ScreenInvite;
