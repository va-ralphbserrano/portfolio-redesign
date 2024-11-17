/**
 * Local storage utility
 */
export const storage = {
  /**
   * Gets a value from local storage
   * @param key - Storage key
   * @param defaultValue - Default value if key doesn't exist
   * @returns Stored value or default value
   */
  get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  /**
   * Sets a value in local storage
   * @param key - Storage key
   * @param value - Value to store
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  /**
   * Removes a value from local storage
   * @param key - Storage key
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};
