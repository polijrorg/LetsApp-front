import * as S from './styles';
import Button from '@components/Button';
import CardSchedule from '@components/CardSchedule';
import { api } from '@services/api';
import { parseISO } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import format from 'date-fns/format';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { ProfileContext } from 'src/contexts/ProfileContext';

const SuggestSchedule: React.FC = ({ navigation }) => {
  const { phoneUser, dateStart, dateEnd, timeStart, timeEnd, duration } =
    useContext(ProfileContext);

  // Função para converter a data em formato ISO com fuso horário
  function formatDateWithTimeZone(dateString, timeZone) {
    const date = parseISO(dateString);
    const zonedDate = utcToZonedTime(date, timeZone);
    return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ssXXX");
  }

  const timeZone = 'America/Sao_Paulo';

  useEffect(() => {
    getSchedules();
  }, []);

  async function getSchedules() {
    try {
      console.log('Telefone do usuário', phoneUser);
      console.log('Data de Inicio:', dateStart);
      console.log('Data de Termino:', dateEnd);
      console.log(
        'Inicio do intervalo formatado:',
        format(timeStart, 'HH:mm:ss')
      );
      console.log('Final do intervalo formatado:', format(timeEnd, 'HH:mm:ss'));
      console.log('Duração:', duration);
      console.log(
        'Formatado certo?',
        formatDateWithTimeZone(dateStart, timeZone)
      );
      const { data } = await api.post('/getRecommededTimes', {
        phone: phoneUser,
        beginDate: dateStart,
        beginHour: format(timeStart, 'HH:mm:ss'),
        duration: duration,
        endDate: dateEnd,
        endHour: format(timeEnd, 'HH:mm:ss'),
        mandatoryGuests: [],
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.ContainerTitle>
        <S.Title>Sugerir Horário</S.Title>
      </S.ContainerTitle>
      <S.Subtitle>Segunda - 30/01 </S.Subtitle>
      <S.ContainerSuggest>
        <CardSchedule day="Seg" date="30" schedule="16h às 17h" />
        <CardSchedule day="Seg" date="30" schedule="17h às 18h" />
      </S.ContainerSuggest>
      <S.Subtitle>Quarta - 01/02 </S.Subtitle>
      <S.ContainerSuggest>
        <CardSchedule day="Qua" date="01" schedule="18h às 19h" />
        <CardSchedule day="Qua" date="01" schedule="19h às 20h" />
      </S.ContainerSuggest>
      <S.Buttons>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DateAndSchedule');
          }}
        >
          <Button
            width="136px"
            backgroundColor="#FAFAFA"
            borderColor="#949494"
            hasIcon={false}
            title="Voltar"
            titleColor="#949494"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateEvent');
          }}
        >
          <Button
            width="136px"
            backgroundColor="#3446E4"
            borderColor="transparent"
            hasIcon={false}
            title="Próximo"
            titleColor="#FAFAFA"
          />
        </TouchableOpacity>
      </S.Buttons>
    </S.Body>
  );
};

export default SuggestSchedule;
