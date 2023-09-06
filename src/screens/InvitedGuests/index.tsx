import * as S from './styles';
import Contact from '@components/Contact';
import { ModalCard } from '@components/Modal';
import useAuth from '@hooks/useAuth';
import CalendarServices from '@services/CalendarServices';
import { theme } from '@styles/default.theme';
import * as Contacts from 'expo-contacts';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import useProfile from 'src/contexts/useProfile';

const IconArrow = require('../../assets/ArrowBackBlack.png');
const IconSearch = require('../../assets/IconSearch.png');
const IconEmail = require('../../assets/Email.png');
const Check = require('../../assets/Check.png');

const InvitedGuests = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addParticipants, setAddParticipants] = useState([]);

  const { setContactSelected } = useProfile();

  const { user } = useAuth();

  const addParticipant = () => {
    if (name && phoneNumber) {
      const newParticipant = { name, phoneNumber, email };
      setAddParticipants([...addParticipants, newParticipant]);
      setName('');
      setPhoneNumber('');
      setEmail('');
      addNewParticipant();
    }
  };

  async function addNewParticipant() {
    try {
      await CalendarServices.addContact({
        userPhone: user.phone,
        phone: phoneNumber,
        name: name,
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.FirstName,
        });
        setContacts(data);
      }
    })();
  }, []);

  const [selectedParticipants, setSelectedParticipants] = useState([]);
  setContactSelected(selectedParticipants);

  const toggleParticipantSelection = (participant) => {
    // Verifica se o participante já foi selecionado
    const isSelected = selectedParticipants.some(
      (p) => p.name === participant.name
    );

    if (isSelected) {
      // Remove o participante do array de selecionados
      setSelectedParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p.name !== participant.name)
      );
    } else {
      // Adiciona o participante ao array de selecionados
      setSelectedParticipants((prevParticipants) => [
        ...prevParticipants,
        participant,
      ]);
    }
  };

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.Header>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MainScreen');
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
        {addParticipants.map((participant, index) => (
          <React.Fragment key={index}>
            <Contact
              name={participant.name}
              phoneOrEmail={participant.phoneNumber}
              email={participant.email}
              onPress={() => toggleParticipantSelection(participant)}
            />
          </React.Fragment>
        ))}
        <S.ContainerSubtitle>
          <S.Subtitle>Pendentes</S.Subtitle>
        </S.ContainerSubtitle>
        {addParticipants.map((participant, index) => (
          <React.Fragment key={index}>
            <Contact
              name={participant.name}
              phoneOrEmail={participant.phoneNumber}
              email={participant.email}
              onPress={() => toggleParticipantSelection(participant)}
            />
          </React.Fragment>
        ))}
        <S.ContainerSubtitle>
          <S.Subtitle>Recusaram</S.Subtitle>
        </S.ContainerSubtitle>
        {contacts &&
          contacts.map((event, index) => (
            <React.Fragment key={index}>
              <Contact
                name={event.name}
                phoneOrEmail={
                  event.phoneNumbers && event.phoneNumbers[0]
                    ? event.phoneNumbers[0].number
                    : 'Nenhum contato disponível'
                }
                isDisabled={true}
              />
            </React.Fragment>
          ))}
      </S.Scroll>
    </S.Body>
  );
};

export default InvitedGuests;
