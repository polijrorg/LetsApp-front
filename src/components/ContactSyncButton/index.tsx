import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';

interface ContactSyncButtonProps {
  provider: 'google' | 'outlook';
  onSync: () => Promise<void>;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  disabled?: boolean;
}

export const ContactSyncButton: React.FC<ContactSyncButtonProps> = ({
  provider,
  onSync,
  syncStatus,
  disabled = false,
}) => {
  const getButtonStyle = () => {
    if (disabled) return [styles.button, styles.disabled];
    
    switch (syncStatus) {
      case 'syncing':
        return [styles.button, styles.syncing];
      case 'success':
        return [styles.button, styles.success];
      case 'error':
        return [styles.button, styles.error];
      default:
        return [styles.button, provider === 'google' ? styles.google : styles.outlook];
    }
  };

  const getButtonText = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'Sincronizando...';
      case 'success':
        return 'Sincronizado ✓';
      case 'error':
        return 'Erro - Tentar novamente';
      default:
        return `Sincronizar ${provider === 'google' ? 'Google' : 'Outlook'}`;
    }
  };

  const getTextStyle = () => {
    if (disabled) return [styles.buttonText, styles.disabledText];
    if (syncStatus === 'error') return [styles.buttonText, styles.errorText];
    return styles.buttonText;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onSync}
      disabled={disabled || syncStatus === 'syncing'}
    >
      <View style={styles.buttonContent}>
        {syncStatus === 'syncing' && (
          <ActivityIndicator 
            size="small" 
            color="white" 
            style={styles.spinner} 
          />
        )}
        <Text style={getTextStyle()}>
          {getButtonText()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    minHeight: 48,
    justifyContent: 'center',
  },
  google: {
    backgroundColor: '#4285F4',
  },
  outlook: {
    backgroundColor: '#0078D4',
  },
  syncing: {
    backgroundColor: '#666',
  },
  success: {
    backgroundColor: '#28a745',
  },
  error: {
    backgroundColor: '#dc3545',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledText: {
    color: '#999',
  },
  errorText: {
    color: 'white',
  },
});

