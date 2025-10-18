/**
 * Normalizes a string by removing accents and converting to lowercase
 * This is useful for search functionality that should ignore accents
 * 
 * @param str - The string to normalize
 * @returns The normalized string (lowercase, without accents)
 * 
 * @example
 * normalizeString("José María") // returns "jose maria"
 * normalizeString("São Paulo") // returns "sao paulo"
 */
export const normalizeString = (str: string): string => {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .normalize('NFD') // Decomposes characters with accents
    .replace(/[\u0300-\u036f]/g, '') // Removes diacritical marks
    .trim();
};

/**
 * Checks if a target string contains a search term, ignoring case and accents
 * 
 * @param target - The string to search in
 * @param searchTerm - The term to search for
 * @returns True if the target contains the search term (case and accent insensitive)
 * 
 * @example
 * containsIgnoringAccents("José María", "jose") // returns true
 * containsIgnoringAccents("São Paulo", "sao pa") // returns true
 * containsIgnoringAccents("Andrea", "ANDRE") // returns true
 */
export const containsIgnoringAccents = (target: string, searchTerm: string): boolean => {
  if (!target || !searchTerm) return true; // If no search term, include all
  
  const normalizedTarget = normalizeString(target);
  const normalizedSearch = normalizeString(searchTerm);
  
  const result = normalizedTarget.includes(normalizedSearch);
  
  // Debug logging
  if (searchTerm && searchTerm.length > 0) {
    console.log(`🔍 Search debug: "${target}" → "${normalizedTarget}" | "${searchTerm}" → "${normalizedSearch}" | Match: ${result}`);
  }
  
  return result;
};