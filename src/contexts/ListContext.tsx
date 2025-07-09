import React, { createContext, ReactElement, useEffect, useState } from "react";
import { getData, storeData } from "../utils/storage";

export type ItemType = {
  id: string;
  title: string;
  rating: number;
  type: "movie" | "book";
  author?: string;
  poster?: string | null;
  year?: string | null;
};

type ListContextType = {
  items: ItemType[] | null;
  setItemStorage: (newItem: ItemType) => Promise<void>;
  updateItem: (updatedItem: ItemType) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
};

const defaultContext: ListContextType = {
  items: null,
  setItemStorage: async () => {},
  updateItem: async () => {},
  removeItem: async () => {},
};

export const ListContext = createContext(defaultContext);

export const ListProvider = ({ children }: { children: ReactElement }) => {
  const [items, setItems] = useState<ItemType[] | null>(null);

  useEffect(() => {
    const loadItemsFromStorage = async () => {
      try {
        const stored = await getData("LIST_ITEMS");
        if (stored) {
          const parsed: ItemType[] = JSON.parse(stored);
          setItems(parsed);
        }
      } catch (e) {
        console.error(
          "Erreur lors de la récupération des items au chargement :",
          e,
        );
      }
    };

    loadItemsFromStorage();
  }, []);

  const setItemStorage = async (newItem: ItemType) => {
    const updatedItems = items ? [...items, newItem] : [newItem];
    await storeData("LIST_ITEMS", JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const updateItem = async (updatedItem: ItemType) => {
    if (!items) return;
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    await storeData("LIST_ITEMS", JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const removeItem = async (id: string) => {
    if (!items) return;
    const updatedItems = items.filter((item) => item.id !== id);
    await storeData("LIST_ITEMS", JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  return (
    <ListContext.Provider
      value={{ items, setItemStorage, updateItem, removeItem }}
    >
      {children}
    </ListContext.Provider>
  );
};
