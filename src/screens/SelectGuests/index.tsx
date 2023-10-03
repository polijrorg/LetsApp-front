import * as S from './styles';
import Contact from '@components/Contact';
import AddContact from '@components/Modals/AddContact';
import useAuth from '@hooks/useAuth';
import { theme } from '@styles/default.theme';
import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import useProfile from 'src/contexts/useProfile';

const IconArrow = require('../../assets/ArrowBackBlack.png');
const IconSearch = require('../../assets/IconSearch.png');
const IconEmail = require('../../assets/Email.png');
const Check = require('../../assets/Check.png');

const SelectGuests = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [addParticipants, setAddParticipants] = useState([]);

  const { setContactSelected } = useProfile();

  const { user } = useAuth();

  const addParticipant = () => {
    if (name && phone) {
      const newParticipant = { name, phone, email };
      setAddParticipants([...addParticipants, newParticipant]);
      setName('');
      setPhone('');
      setEmail('');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const getContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.FirstName,
        });
        setContacts(data.slice(0, 15));
      }
    };
    getContacts();
  }, []);

  const [selectedParticipants, setSelectedParticipants] = useState([]);
  // setContactSelected(selectedParticipants);

  // const toggleParticipantSelection = (participant) => {
  //   // Verifica se o participante já foi selecionado
  //   const isSelected = selectedParticipants.some(
  //     (p) => p.name === participant.name
  //   );

  //   if (isSelected) {
  //     // Remove o participante do array de selecionados
  //     setSelectedParticipants((prevParticipants) =>
  //       prevParticipants.filter((p) => p.name !== participant.name)
  //     );
  //   } else {
  //     // Adiciona o participante ao array de selecionados
  //     setSelectedParticipants((prevParticipants) => [
  //       ...prevParticipants,
  //       participant,
  //     ]);
  //   }
  // };

  return (
    <S.Body>
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
      <Pressable onPress={handleOpen}>
        <S.ContainerEmail>
          <S.ContainerIcon>
            <S.IconEmail source={IconEmail} />
          </S.ContainerIcon>
          <S.Email>
            <S.AddContact>Adicionar Contato</S.AddContact>
          </S.Email>
        </S.ContainerEmail>
      </Pressable>
      <Modal visible={open} transparent>
        <AddContact
          setOpen={setOpen}
          setEmail={setEmail}
          setName={setName}
          setPhone={setPhone}
        />
      </Modal>
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
