import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("Erreur lors de la sauvegarde :", e);
  }
};

export const getData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error("Erreur lors de la lecture :", e);
    return null;
  }
};

export const removeData = async (key: string): Promise<string | null> => {
  try {
    await AsyncStorage.removeItem(key);
    return null;
  } catch (e) {
    console.error("Erreur lors de la lecture :", e);
    return null;
  }
};
