/* eslint-disable no-shadow */
import React, { createContext, useContext, useState } from 'react';

export type LocalStorageProviderContext = {
  setToken: (token: string) => void;
  removeToken: () => void;
  token: string | null;
};

export const LocalStorageContext = createContext({} as LocalStorageProviderContext);

export const TOKEN = 'token';

export type LocalStorageProviderProps = {
  children: React.ReactNode;
};

export const LocalStorageProvider = ({ children }: LocalStorageProviderProps) => {
  const [data, setData] = useState<Record<string, any>>(() => {
    const localStorageEntries = Object.entries({ ...localStorage }).map(([key, value]) => {
      const getValue = () => {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      };
      return [key, getValue()];
    });

    return Object.fromEntries(localStorageEntries);
  });

  const setItem = (key: string, value: any) => {
    setData((data) => ({
      ...data,
      [key]: value,
    }));
    localStorage.setItem(key, JSON.stringify(value));
  }

  const getItem = (key: string) => data[key] ?? null;

  const removeItem = (key: string) => {
    setData((data) => {
      const { ...copyDate } = data;
      delete copyDate[key];

      return copyDate;
    });
    localStorage.removeItem(key);
  }

  const token = getItem(TOKEN);
  const setToken = (token: string) => {
    setItem(TOKEN, token);
  };
  const removeToken = () => {
    removeItem(TOKEN)
  };

  return (
    <LocalStorageContext.Provider
      value={{ setToken, removeToken, token }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorage = () => useContext(LocalStorageContext);
