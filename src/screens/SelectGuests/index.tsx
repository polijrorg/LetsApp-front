import * as S from './styles';
import Contact from '@components/Contact';
import { ModalCard } from '@components/Modal';
import { api } from '@services/api';
import { theme } from '@styles/default.theme';
import * as Contacts from 'expo-contacts';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { ProfileContext } from 'src/contexts/ProfileContext';

const IconArrow = require('../../assets/ArrowBackBlack.png');
const IconSearch = require('../../assets/IconSearch.png');
const IconEmail = require('../../assets/Email.png');
const IconSend = require('../../assets/Send.png');
const Check = require('../../assets/Check.png');

const SelectGuests = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addParticipants, setAddParticipants] = useState([]);

  const { phoneUser, setContactSelected } = useContext(ProfileContext);

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
    // try {
    //   const { data } = await api.post('addContact', {
    //     userPhone: phoneUser,
    //     phone: phoneNumber,
    //     name: name,
    //     email: 'caiogiro10@gmail.com',
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
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
      <S.ContainerSearch>
        <S.ContainerIcon>
          <S.IconSearch source={IconSearch} />
        </S.ContainerIcon>
        <S.InputSearch
          placeholder="Pesquisar..."
          placeholderTextColor={theme.colors.mediumEmphasis}
          value={search}
          onChangeText={(texto) => setSearch(texto)}
        />
      </S.ContainerSearch>
      <TouchableOpacity
        onPress={() => {
          setOpen(true);
        }}
      >
        <S.ContainerEmail>
          <S.ContainerIcon>
            <S.IconEmail source={IconEmail} />
          </S.ContainerIcon>
          <S.Email>
            <S.AddContact>Adicionar Contato</S.AddContact>
          </S.Email>
        </S.ContainerEmail>
      </TouchableOpacity>
      <ModalCard
        Open={open}
        setOpen={setOpen}
        navigation={navigation}
        screen="SelectGuests"
        type="Contact"
        name={name}
        setName={setName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
        addParticipant={addParticipant}
      />
      <S.Scroll>
        <S.ContainerSubtitle>
          <S.Subtitle>Contatos Adicionados</S.Subtitle>
          <S.Mandatory>Obrigatório?</S.Mandatory>
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
          <S.Subtitle>Minha Agenda</S.Subtitle>
          <S.Mandatory>Obrigatório?</S.Mandatory>
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
              />
            </React.Fragment>
          ))}
      </S.Scroll>
      <S.IconCheck>
        <TouchableOpacity
          onPress={() => navigation.navigate('DateAndSchedule')}
        >
          <S.Check source={Check} />
        </TouchableOpacity>
      </S.IconCheck>
    </S.Body>
  );
};

export default SelectGuests;
