import * as S from './styles';
import Contact from '@components/Contact';
import { IEventsUserResponse } from '@interfaces/Events';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const IconArrow = require('../../assets/ArrowBackBlack.png');

const InvitedGuests = ({ navigation, route }) => {
  const event: IEventsUserResponse = route.params.event;
  console.log('InvitedGuests 10 event.accepted:', JSON.stringify(event.accepted));
  return (
    <S.MainWrapper>
      <S.Body>
        <S.Header>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ScreenEvent', { event });
            }}
          >
            <S.IconBack source={IconArrow} />
          </TouchableOpacity>
          <S.Title>Convidados</S.Title>
        </S.Header>
        <S.Scroll>
          <S.ContainerSubtitle>
            <S.Subtitle>Aceitaram</S.Subtitle>
          </S.ContainerSubtitle>
          {event &&
            event.accepted.map((guest) => (
              <Contact
                key={guest?.id}
                name={guest?.displayName || 'Convidado'}
                phoneOrEmail={guest?.email}
                isDisabled={true}
              />
            ))}
          {event.accepted.length ===
            0 && <S.EmptyText>Nenhum convidado aceitou o convite</S.EmptyText>}
          <S.ContainerSubtitle>
            <S.Subtitle>Pendentes</S.Subtitle>
          </S.ContainerSubtitle>
          {event &&
            event.tentative.map((guest) => (
              <Contact
                key={guest?.id}
                name={guest?.displayName || 'Convidado'}
                phoneOrEmail={guest?.email}
                isDisabled={true}
              />
            ))}
          {event.tentative.length ===
            0 && <S.EmptyText>Nenhum convidado pendente</S.EmptyText>}
          <S.ContainerSubtitle>
            <S.Subtitle>Recusaram</S.Subtitle>
          </S.ContainerSubtitle>
          {event &&
            event.declined.map((guest) => (
              <Contact
                key={guest?.id}
                name={guest?.displayName || 'Convidado'}
                phoneOrEmail={guest?.email}
                isDisabled={true}
              />
            ))}
          {/* {event &&
            event.no.pseudoAttendes.map((guest) => (
              <Contact
                key={guest.pseudoUserId}
                name="Convidado"
                phoneOrEmail={guest.email || guest.phone}
                isDisabled={true}
              />
            ))} */}
          {event.declined.length === 0 && (
            <S.EmptyText>Nenhum convidado recusou o convite</S.EmptyText>
          )}
          <S.ContainerSubtitle>
            <S.Subtitle>Não responderam</S.Subtitle>
          </S.ContainerSubtitle>
          {event &&
            event.needsAction.map((guest) => (
              <Contact
                key={guest?.id}
                name={guest?.displayName || 'Convidado'}
                phoneOrEmail={guest?.email}
                isDisabled={true}
              />
            ))}
        </S.Scroll>
      </S.Body>
    </S.MainWrapper>
  );
};

export default InvitedGuests;
