import * as S from './styles';
import Contact from '@components/Contact';
import AddContact from '@components/Modals/AddContact';
import useAuth from '@hooks/useAuth';
import { api } from '@services/api';
import { theme } from '@styles/default.theme';
import * as Contacts from 'expo-contacts';
import { Modal } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import useProfile, { ContactInfo } from 'src/contexts/useProfile';

const IconArrow = require('../../assets/ArrowBackBlack.png');
const IconSearch = require('../../assets/IconSearch.png');
const IconEmail = require('../../assets/Email.png');
const Check = require('../../assets/Check.png');

const SelectGuests = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState(null);
  const [userContacts, setUserContacts] = useState(null);
  const [open, setOpen] = useState(false);

  const [contactSelected, setContactSelected] = useState<ContactInfo[]>([]);
  const [mandatoryContactSelected, setMandatoryContactSelected] = useState<
    ContactInfo[]
  >([]);

  const { user } = useAuth();

  useEffect(() => {
    const getUserContacts = async () => {
      try {
        const response = await api.get(`GetUserByPhone/${user.phone}`);
        setUserContacts(response.data.user.contatos);
        console.log('completeUser', response.data);
        console.log('user', user);
      } catch (error) {
        console.log(error);
      }
    };
    getUserContacts();
  }, [user, open]);

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

  const toggleParticipantSelection = (participant) => {
    // Verifica se o participante já foi selecionado
    const isSelected = contactSelected.some((p) => p.name === participant.name);
    const isMandatory = mandatoryContactSelected.some(
      (p) => p.name === participant.name
    );

    if (isSelected) {
      // Remove o participante do array de selecionados e adiciona aos mandatorios
      setContactSelected((prevParticipants) =>
        prevParticipants.filter((p) => p.name !== participant.name)
      );
      setMandatoryContactSelected((prevParticipants) => [
        ...prevParticipants,
        participant,
      ]);
    } else if (isMandatory) {
      // Remove o participante do array de mandatorios
      setMandatoryContactSelected((prevParticipants) =>
        prevParticipants.filter((p) => p.name !== participant.name)
      );
    } else {
      // Adiciona o participante ao array de selecionados
      setContactSelected((prevParticipants) => [
        ...prevParticipants,
        participant,
      ]);
    }
  };

  // console.log('contatos', contactSelected);
  // console.log('mandatórios', mandatoryContactSelected);

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
      <Modal isOpen={open}>
        <AddContact setOpen={setOpen} userPhone={user.phone} />
      </Modal>
      <S.Scroll>
        <S.ContainerSubtitle>
          <S.Subtitle>Contatos Adicionados</S.Subtitle>
          <S.Mandatory>Obrigatório?</S.Mandatory>
        </S.ContainerSubtitle>
        <Contact
          name="Letícia"
          phoneOrEmail="+5511995076244"
          email="leticia@falconer.com.br"
          onPress={() =>
            toggleParticipantSelection({
              name: 'Teste',
              email: 'leticia@falconer.com',
              phoneNumber: '5511995076244',
            })
          }
        />
        <Contact
          name="Luiz"
          phoneOrEmail="+5511982553531"
          email="luiz.silva@polijunior.com.br"
          onPress={() =>
            toggleParticipantSelection({
              name: 'Luiz',
              email: 'luiz.silva@polijunior.com.br',
              phoneNumber: '+5511982553531',
            })
          }
        />
        {userContacts?.map((participant, index) => (
          <React.Fragment key={index}>
            <Contact
              name={participant.name}
              phoneOrEmail={participant.phone}
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
          onPress={() =>
            navigation.navigate('DateAndSchedule', {
              contactSelected,
              mandatoryContactSelected,
            })
          }
        >
          <S.Check source={Check} />
        </TouchableOpacity>
      </S.IconCheck>
    </S.Body>
  );
};

export default SelectGuests;
