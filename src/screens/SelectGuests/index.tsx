import * as S from './styles';
import Contact from '@components/Contact';
import AddContact from '@components/Modals/AddContact';
import useAuth from '@hooks/useAuth';
import useInvite from '@hooks/useInvite';
import UserServices from '@services/UserServices';
import { api } from '@services/api';
import { theme } from '@styles/default.theme';
import * as Contacts from 'expo-contacts';
import { Modal } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, TouchableOpacity } from 'react-native';

const IconArrow = require('../../assets/ArrowBackBlack.png');
const IconSearch = require('../../assets/IconSearch.png');
const IconEmail = require('../../assets/Email.png');
const Check = require('../../assets/Check.png');

const SelectGuests = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState(null);
  const [userContacts, setUserContacts] = useState(null);
  const [open, setOpen] = useState(false);
  const [possibleMandatory, setPossibleMandatory] = useState(true);

  const { user } = useAuth();

  const {
    contactSelected,
    setContactSelected,
    mandatoryContactSelected,
    setMandatoryContactSelected,
  } = useInvite();

  useEffect(() => {
    const getUserContacts = async () => {
      try {
        const response = await api.get(`GetUserByPhone/${user.phone}`);
        setUserContacts(response.data.user.contatos);
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
        setContacts(data);
      }
    };
    getContacts();
  }, []);

  const toggleParticipantSelection = (participant) => {
    // Verifica se o participante já foi selecionado
    const isSelected = contactSelected.some((p) => p.id === participant.id);
    const isMandatory = mandatoryContactSelected.some(
      (p) => p.id === participant.id
    );

    if (isSelected) {
      // Verifica se contato pode ser obrigatório
      const isPossibleMandatory = async () => {
        const response = await UserServices.isPossibleMandatoryUser({
          phone: participant.phone,
          email: participant.email,
        });

        setPossibleMandatory(response);
      };

      isPossibleMandatory();

      if (!possibleMandatory) {
        Alert.alert(
          'Contato não registrado no Lets App, enviaremos um convite por email/sms'
        );
      }
      // Remove o participante do array de selecionados e adiciona aos mandatorios
      setContactSelected((prevParticipants) =>
        prevParticipants.filter((p) => p.id !== participant.id)
      );
      setMandatoryContactSelected((prevParticipants) => [
        ...prevParticipants,
        participant,
      ]);
    } else if (isMandatory) {
      // Remove o participante do array de mandatorios
      setMandatoryContactSelected((prevParticipants) =>
        prevParticipants.filter((p) => p.id !== participant.id)
      );
    } else {
      // Adiciona o participante ao array de selecionados
      setContactSelected((prevParticipants) => [
        ...prevParticipants,
        participant,
      ]);
    }
  };

  useEffect(() => {
    console.log('Contatos selecionados', contactSelected);
    console.log('Contatos obrigatórios', mandatoryContactSelected);
  }, [contactSelected, mandatoryContactSelected]);

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
        {userContacts?.lenght > 0 && (
          <S.ContainerSubtitle>
            <S.Subtitle>Contatos LetsApp</S.Subtitle>
            <S.Mandatory>Obrigatório?</S.Mandatory>
          </S.ContainerSubtitle>
        )}
        {userContacts?.map((participant, index) => (
          <React.Fragment key={index}>
            <Contact
              name={participant.name}
              phoneOrEmail={participant.email || participant.phone}
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
