// Enhanced URL handling for iOS Safari compatibility

export const validateAndEncodeUrl = (url: string, provider: string): string => {
  console.log(`🔗 Validating ${provider} URL:`, url);
  
  // Basic validation
  if (!url || typeof url !== 'string') {
    console.error(`❌ Invalid URL format for ${provider}:`, url);
    throw new Error(`URL inválida recebida para ${provider}`);
  }
  
  // Check if URL starts with http/https
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    console.error(`❌ URL doesn't start with http/https for ${provider}:`, url);
    throw new Error(`URL deve começar com http:// ou https://`);
  }
  
  // Validate URL format
  try {
    new URL(url);
  } catch (urlError) {
    console.error(`❌ Invalid URL format for ${provider}:`, url, urlError);
    throw new Error(`Formato de URL inválido para ${provider}`);
  }
  
  // Encode for iOS Safari compatibility
  // Note: Don't double-encode if already encoded
  const encodedUrl = url.includes('%') ? url : encodeURI(url);
  
  console.log(`✅ ${provider} URL validated and encoded:`, encodedUrl);
  return encodedUrl;
};

export const getWebBrowserOptions = () => ({
  dismissButtonStyle: 'close' as const,
  presentationStyle: 'overCurrentContext' as const,
  showTitle: false,
  enableBarCollapsing: false,
  // iOS specific options for better compatibility
  controlsColor: '#3446E4',
  toolbarColor: '#FFFFFF',
});