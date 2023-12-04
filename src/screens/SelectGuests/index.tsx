import * as S from './styles';
import Contact from '@components/Contact';
import AddContact from '@components/Modals/AddContact';
import useAuth from '@hooks/useAuth';
import useInvite from '@hooks/useInvite';
import IContact from '@interfaces/Contacts';
import UserServices from '@services/UserServices';
import { api } from '@services/api';
import { theme } from '@styles/default.theme';
import * as Contacts from 'expo-contacts';
import { Modal } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  TouchableOpacity,
} from 'react-native';

const IconArrow = require('../../assets/ArrowBackBlack.png');
const IconSearch = require('../../assets/IconSearch.png');
const IconEmail = require('../../assets/Email.png');
const Check = require('../../assets/Check.png');

const SelectGuests = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState(null);
  const [userContacts, setUserContacts] = useState<IContact[]>([]);
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
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

  const toggleMandatory = async (participant) => {
    const isMandatory = mandatoryContactSelected.some(
      (p) => p.id === participant.id
    );

    const formattedPhone = formatPhone(participant);

    const possibleMandatory =
      (await UserServices.isPossibleMandatoryUser({
        phone: formattedPhone.phone,
        email: participant.email,
      })) || false;

    if (isMandatory) {
      // Remove o participante do array de mandatorios e adiciona aos selecionados
      setMandatoryContactSelected((prevParticipants) =>
        prevParticipants.filter((p) => p.id !== participant.id)
      );
      setContactSelected((prevParticipants) => [
        ...prevParticipants,
        formattedPhone,
      ]);
    } else {
      if (!possibleMandatory) {
        Alert.alert(
          'Contato não registrado no Lets App',
          'Não temos acesso ao seu calendário, enviaremos um convite por email/sms'
        );
        return;
      }
      // Remove o participante do array de selecionados e adiciona aos mandatorios
      setContactSelected((prevParticipants) =>
        prevParticipants.filter((p) => p.id !== participant.id)
      );
      setMandatoryContactSelected((prevParticipants) => [
        ...prevParticipants,
        formattedPhone,
      ]);
    }
  };

  const toggleParticipantSelection = async (participant) => {
    // Verifica se o participante já foi selecionado
    const isSelected = contactSelected.some((p) => p.id === participant.id);
    const isMandatory = mandatoryContactSelected.some(
      (p) => p.id === participant.id
    );

    if (isSelected) {
      // Remove o participante do array de selecionados
      setContactSelected((prevParticipants) =>
        prevParticipants.filter((p) => p.id !== participant.id)
      );
    } else if (isMandatory) {
      // Remove o participante do array de mandatorios e de selecionados
      setMandatoryContactSelected((prevParticipants) =>
        prevParticipants.filter((p) => p.id !== participant.id)
      );
      setContactSelected((prevParticipants) =>
        prevParticipants.filter((p) => p.id !== participant.id)
      );
    } else {
      const formattedPhone = formatPhone(participant);
      setContactSelected((prevParticipants) => [
        ...prevParticipants,
        formattedPhone,
      ]);
    }
  };

  const formatPhone = (participant) => {
    // Formata o telefone do participante
    let unsignedPhone: string | any[];
    if (participant.phoneNumbers) {
      unsignedPhone = participant.phoneNumbers[0]?.number?.replace(
        /[\s()-]/g,
        ''
      );
    }

    let formattedPhone: string;
    if (unsignedPhone) {
      if (unsignedPhone.length === 9) {
        formattedPhone = `+55${user.phone.slice(3, 5)}${unsignedPhone}`;
      } else if (unsignedPhone.length === 8) {
        formattedPhone = `+55${user.phone.slice(3, 5)}9${unsignedPhone}`;
      } else if (unsignedPhone.length >= 11) {
        formattedPhone = `+55${unsignedPhone.slice(unsignedPhone.length - 11)}`;
      }
    }

    const usersPhoneParticipant: IContact = {
      id: participant.id,
      userId: user.id,
      name: participant.name,
      phone: participant.phone || formattedPhone,
      email: participant.email,
    };

    return usersPhoneParticipant;
  };

  return (
    <>
      {isLoading && (
        <S.SpinnerWrapper>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </S.SpinnerWrapper>
      )}
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
            onChangeText={(texto: string) => setSearch(texto)}
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
        {userContacts?.length > 0 && (
          <S.ContainerSubtitle>
            <S.Subtitle>Contatos</S.Subtitle>
            <S.Mandatory>Obrigatório?</S.Mandatory>
          </S.ContainerSubtitle>
        )}
        <S.Scroll>
          {userContacts
            ?.filter((participant) => participant.name?.includes(search))
            .map((participant, index) => (
              <React.Fragment key={index}>
                <Contact
                  name={participant.name}
                  phoneOrEmail={participant.email || participant.phone}
                  onPress={() => toggleParticipantSelection(participant)}
                  onPressMandatory={() => toggleMandatory(participant)}
                  isSelected={contactSelected.some(
                    (p) => p.id === participant.id
                  )}
                  isMandatory={mandatoryContactSelected.some(
                    (p) => p.id === participant.id
                  )}
                />
              </React.Fragment>
            ))}
          <S.ContainerSubtitle>
            <S.Subtitle>Minha Agenda</S.Subtitle>
            <S.Mandatory>Obrigatório?</S.Mandatory>
          </S.ContainerSubtitle>
          {contacts &&
            contacts
              .filter((participant) => participant.name?.includes(search))
              .map((event, index) => (
                <React.Fragment key={index}>
                  <Contact
                    name={event.name}
                    phoneOrEmail={
                      event.phoneNumbers && event.phoneNumbers[0]
                        ? event.phoneNumbers[0].number
                        : 'Nenhum contato disponível'
                    }
                    onPress={() => toggleParticipantSelection(event)}
                    onPressMandatory={() => toggleMandatory(event)}
                    isSelected={contactSelected.some((p) => p.id === event.id)}
                    isMandatory={mandatoryContactSelected.some(
                      (p) => p.id === event.id
                    )}
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
    </>
  );
};

export default SelectGuests;
