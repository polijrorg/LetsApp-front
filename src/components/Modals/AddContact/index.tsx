import * as S from './styles';
import FixedInput from '@components/FixedInput';
import useAuth from '@hooks/useAuth';
import CalendarServices from '@services/CalendarServices';
import React from 'react';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  // name?: string;
  // setName: (name: string) => void;
  // email?: string;
  // phone?: string;
  // setPhone: (name: string) => void;
  // setEmail: (name: string) => void;
}

const AddContact: React.FC<Props> = ({
  setOpen,
  // name,
  // setName,
  // email,
  // setEmail,
  // phone,
  // setPhone,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const { user } = useAuth();
  const handleAddContact = async () => {
    console.log('entrou');
    try {
      console.log({
        email,
        name,
        phone,
        userPhone: user.phone,
      });
      if (!name && !phone && !email) {
        alert('Campos Nome e Telefone ou Email são obrigatórios');
        return;
      }
      await CalendarServices.addContact({
        email,
        name,
        phone,
        userPhone: user.phone,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Body>
      <S.ModalView>
        {/* <S.BackButton
          onPress={() => {
            setOpen(false);
          }}
        >
          <S.IconBack source={require('../../../assets/ArrowBackBlue.png')} />
        </S.BackButton> */}
        <S.Title>Adicionar novo contato</S.Title>
        <FixedInput
          height="32px"
          width="278px"
          placeholder="Nome"
          value={name}
          setValue={setName}
        />
        <FixedInput
          height="32px"
          width="278px"
          placeholder="Telefone"
          value={phone}
          setValue={setPhone}
        />
        <FixedInput
          height="32px"
          width="278px"
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />
        <S.ConfirmButton onPress={handleAddContact}>
          <Icon name="check" size={30} color="#3446E4" />
        </S.ConfirmButton>
      </S.ModalView>
    </S.Body>
  );
};

export default AddContact;