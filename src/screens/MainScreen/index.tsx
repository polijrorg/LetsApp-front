import { AuthenticationModal } from '@components/AuthenticationModal';
import * as S from './styles';
import Calendar from '@components/Calendar';
import CardsEvent from '@components/CardsEvent';
import CardsInvite from '@components/CardsInvite';
import { ModalCalendar } from '@components/ModalCalendar';
import useAuth from '@hooks/useAuth';
import CompleteUser from '@interfaces/CompleteUser';
import Invite from '@interfaces/Invites';
import { useIsFocused } from '@react-navigation/native';
import CalendarServices from '@services/CalendarServices';
import { api } from '@services/api';
import 'moment/locale/pt-br';
import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { google, calendar_v3 } from 'googleapis';


type GoogleEvent = calendar_v3.Schema$Event;
const IconProfile = require('../../assets/UserCircle.png');
const IconMore = require('../../assets/IconMore.png');

const MainScreen = ({ navigation }) => {
  const { user, deleteAsyncStorage, updateUser } = useAuth();

  const [open, setOpen] = useState(false); // Start as false, will be set based on calendar_found
  const [completeUser, setCompleteUser] = useState<CompleteUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Debug logging for state changes
  useEffect(() => {
    console.log('MainScreen: State changed - open:', open, 'isLoading:', isLoading);
  }, [open, isLoading]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log('MainScreen: Starting getUser, user:', user?.phone);
        setIsLoading(true);
        const response = await api.get(`GetUserByPhone/${user?.phone}`);
        console.log(`MainScreen: User data fetched, calendar_found: ${response.data?.calendar_found}`);
        console.log(`MainScreen: Full response:`, JSON.stringify(response.data, null, 2));
        setCompleteUser(response.data);
        
        // Only show authentication modal if calendar is NOT found
        if (!response.data?.calendar_found) {
          console.log('MainScreen: No calendar found, showing auth modal');
          console.log('MainScreen: Setting open=true and isLoading=false');
          setOpen(true);
          setIsLoading(false); // Stop loading if no calendar (show auth modal)
        } else {
          console.log('MainScreen: Calendar found, keeping loading active for initialization');
        }
        // If calendar is found, loading will be stopped by the initialization useEffect

      } catch (error) {
        console.log('MainScreen: Error fetching user', error);
        console.log('MainScreen: Error response:', error.response?.data);
        console.log('MainScreen: Error status:', error.response?.status);
        
        // Handle specific error cases
        if (error.response?.status === 400) {
          const errorMessage = error.response?.data?.message;
          
          // Token not found means user hasn't connected a calendar yet - this is OK!
          // Show the authentication modal instead of treating it as an error
          if (errorMessage === 'Token Not Found') {
            console.log('MainScreen: Token not found - user needs to connect calendar');
            console.log('MainScreen: Setting open=true and isLoading=false to show auth modal');
            setOpen(true);
            setIsLoading(false);
            return;
          }
          
          // User not found - clear storage and restart
          if (errorMessage === 'User Not Found') {
            console.log('MainScreen: User not found, clearing storage');
            await deleteAsyncStorage();
            return;
          }
          
          // Other 400 errors
          console.log('MainScreen: 400 error -', errorMessage);
        }
        
        setIsLoading(false); // Stop loading on error
      }
    };
    
    // Reset initialization flag when screen is focused
    if (isFocused) {
      console.log('MainScreen: Screen focused, resetting initialization');
      setHasInitializedCalendar(false);
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isFocused]);

  const [selectedOption, setSelectedOption] = useState('invite'); // Inicialmente seleciona o botão de eventos
  const [showEvent, setShowEvent] = useState(false);
  const [invites, setInvites] = useState<GoogleEvent[]>([]);
  const [events, setEvents] = useState<GoogleEvent[]>([]);
  const [numberInvites, setNumberInvites] = useState<number>(null);

  const getEvents = async () => {
    try {
      console.log('MainScreen 68 completeUser: Events', completeUser);
      if (completeUser !== null) {
        const response = await CalendarServices.getUserEvents(
          completeUser.user?.email
        );
        // console.log(`MainScreen 68 Events: ${JSON.stringify(response)}`)
        setEvents(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInvites = async () => {
    try {
      console.log('MainScreen 45 completeUser: Invites', completeUser);
      
      if (completeUser !== null) {
        const response = await CalendarServices.getUserInvites(
          completeUser.user?.email
        );
        console.log(`MainScreen 53 Invites: ${JSON.stringify(response)}`)
        // console.log('MainScreen 54 Invites: ', response);
        // console.log(`MainScreen 53 Invites: ${JSON.stringify(response)}`)
        setInvites(response);
        setNumberInvites(response.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Only fetch events/invites if user has email AND calendar is connected
    if (user?.email && completeUser && completeUser.calendar_found) {
      console.log('MainScreen: Fetching events and invites for connected calendar');
      getInvites();
      getEvents();
    } else if (completeUser && !completeUser.calendar_found) {
      console.log('MainScreen: Skipping calendar fetch - no calendar connected');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completeUser?.user?.email, user?.email, completeUser?.calendar_found]);

  // This useEffect should only run once when completeUser is first set with calendar_found = true
  const [hasInitializedCalendar, setHasInitializedCalendar] = useState(false);

  useEffect(() => {
    const initializeCalendar = async () => {
      if (hasInitializedCalendar) {
        console.log('MainScreen: Calendar already initialized');
        setIsLoading(false);
        return;
      }
      
      // Only run if calendar is found
      if (!completeUser?.calendar_found) {
        console.log('MainScreen: No calendar to initialize, skipping');
        return; // Don't do anything if no calendar - the first useEffect handles this
      }
      
      try {
        console.log('MainScreen: Initializing calendar for type:', completeUser.user.type);
        
        // User already has calendar connected, just update their data
        await updateUser();
        setHasInitializedCalendar(true); // Mark as initialized
        console.log('MainScreen: Calendar initialized successfully');
      } catch (error) {
        console.log('MainScreen: Error initializing calendar:', error);
        if (error.response?.data?.message === 'User Not Found') {
          deleteAsyncStorage();
        }
      } finally {
        // Always stop loading after calendar initialization attempt
        setIsLoading(false);
      }
    };
    
    // Only call initialization if we have complete user data and calendar is found
    if (completeUser?.user?.phone && completeUser?.calendar_found) {
      initializeCalendar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[completeUser?.calendar_found, completeUser?.user?.phone, hasInitializedCalendar]);

  const handleEventsPress = () => {
    console.log('🔥 CLICOU EM EVENTOS');
    getEvents();
    setSelectedOption('events');
    setShowEvent(true);
  };

  const handleInvitePress = () => {
    console.log('🔥 CLICOU EM EVENTOS');
    getInvites();
    setSelectedOption('invite');
    setShowEvent(false);
  };

  return (
    <S.Container>
        {/* Loading Modal */}
        <Modal
          visible={isLoading}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <ActivityIndicator size="large" color="#3446E4" />
              <Text style={styles.loadingText}>Carregando...</Text>
            </View>
          </View>
        </Modal>

        <AuthenticationModal
          visible={open} 
          onClose={function (): void {
            console.log('🔴 Fechando modal');
            setOpen(false);
          }}
          onSuccess={async function (provider: 'google' | 'outlook'): Promise<void> {
            console.log('🟢 Sucesso na autenticação:', provider);
            setOpen(false);
            
            // Reset the initialization flag and fetch updated user data
            setHasInitializedCalendar(false);
            
            try {
              console.log('🟢 Fetching updated user data after calendar connection...');
              const response = await api.get(`GetUserByPhone/${user?.phone}`);
              console.log('🟢 Updated user data:', response.data);
              setCompleteUser(response.data);
              
              if (response.data?.calendar_found) {
                console.log('🟢 Calendar successfully connected!');
              }
            } catch (error) {
              console.error('🔴 Error fetching updated user data:', error);
            }
          }}
          userPhone={user?.phone} />
      <S.Header>
        <S.Name>Olá {user?.name}!</S.Name>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile', {
              name: user?.name,
              imageUser: user?.photo,
              email: completeUser?.user?.email,
              phone: user?.phone,
            });
          }}
        >
          {user?.photo ? (
            <S.Icon source={{ uri: user.photo }} />
          ) : (
            <S.Icon source={IconProfile} />
          )}
        </TouchableOpacity>
      </S.Header>
      <Calendar />
      <S.Body>
        <S.ContainerOptions>
          <S.OptionEvents onPress={handleEventsPress} Option={selectedOption}>
            <S.Events Option={selectedOption}>Eventos</S.Events>
          </S.OptionEvents>
          <S.OptionInvite onPress={handleInvitePress} Option={selectedOption}>
            <S.Invite Option={selectedOption}>Convites</S.Invite>
            {numberInvites ? (
              <S.NumberInvites>
                <S.Number>{numberInvites}</S.Number>
              </S.NumberInvites>
            ) : (
              <></>
            )}
          </S.OptionInvite>
        </S.ContainerOptions>
        <S.ScrollView showsVerticalScrollIndicator={false}>
          {showEvent ? (
            <S.ContainerEvent>
              {events.length === 0 && (
                <S.EmptyText>
                  ⚠️ Clique no ícone de + para criar seu primeiro evento ou
                  aceite um convite!
                </S.EmptyText>
              )}
              {events.map((event, index) => (
                <React.Fragment key={index}>
                  <CardsEvent
                    key={event.id}
                    event={event}
                    navigation={navigation}
                  />
                </React.Fragment>
              ))}
            </S.ContainerEvent>
          ) : (
            <S.ContainerInvite>
              {invites.length === 0 && (
                <S.EmptyText>
                  ⚠️ Você ainda não foi convidado para nenhum evento!
                </S.EmptyText>
              )}

              {invites.map((invite, index) => (
                <React.Fragment key={index}>
                  <CardsInvite
                    key={invite.id}
                    invite={invite}
                    navigation={navigation}
                  />
                </React.Fragment>
              ))}
            </S.ContainerInvite>
          )}
        </S.ScrollView>
        <S.IconMore>
          <TouchableOpacity onPress={() => navigation.navigate('SelectGuests')}>
            <S.More source={IconMore} />
          </TouchableOpacity>
        </S.IconMore>
      </S.Body>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#545454',
    fontWeight: '500',
  },
});

export default MainScreen;
