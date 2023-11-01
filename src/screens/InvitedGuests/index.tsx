import * as S from './styles';
import Contact from '@components/Contact';
import Event from '@interfaces/Events';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const IconArrow = require('../../assets/ArrowBackBlack.png');

const InvitedGuests = ({ navigation, route }) => {
  const event: Event = route.params.event;

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
            event.yes.ateendees.map((guest) => (
              <Contact
                key={guest.id}
                name={guest.name}
                phoneOrEmail={guest.email}
                isDisabled={true}
              />
            ))}
          {event &&
            event.yes.pseudoAttendes.map((guest) => (
              <Contact
                key={guest.pseudoUserId}
                name="Convidado"
                phoneOrEmail={guest.email || guest.phone}
                isDisabled={true}
              />
            ))}
          {event.yes.ateendees.length + event.yes.pseudoAttendes.length ===
            0 && <S.EmptyText>Nenhum convidado aceitou o convite</S.EmptyText>}
          <S.ContainerSubtitle>
            <S.Subtitle>Pendentes</S.Subtitle>
          </S.ContainerSubtitle>
          {event &&
            event.maybe.ateendees.map((guest) => (
              <Contact
                key={guest.id}
                name={guest.name}
                phoneOrEmail={guest.email}
                isDisabled={true}
              />
            ))}
          {event &&
            event.maybe.pseudoAttendes.map((guest) => (
              <Contact
                key={guest.pseudoUserId}
                name="Convidado"
                phoneOrEmail={guest.email || guest.phone}
                isDisabled={true}
              />
            ))}
          {event.maybe.ateendees.length + event.maybe.pseudoAttendes.length ===
            0 && <S.EmptyText>Nenhum convidado pendente</S.EmptyText>}
          <S.ContainerSubtitle>
            <S.Subtitle>Recusaram</S.Subtitle>
          </S.ContainerSubtitle>
          {event &&
            event.no.ateendees.map((guest) => (
              <Contact
                key={guest.id}
                name={guest.name}
                phoneOrEmail={guest.email}
                isDisabled={true}
              />
            ))}
          {event &&
            event.no.pseudoAttendes.map((guest) => (
              <Contact
                key={guest.pseudoUserId}
                name="Convidado"
                phoneOrEmail={guest.email || guest.phone}
                isDisabled={true}
              />
            ))}
          {event.no.ateendees.length + event.no.pseudoAttendes.length === 0 && (
            <S.EmptyText>Nenhum convidado recusou o convite</S.EmptyText>
          )}
        </S.Scroll>
      </S.Body>
    </S.MainWrapper>
  );
};

export default InvitedGuests;
