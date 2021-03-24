import React, {createContext, useContext, useEffect, useState} from 'react';
import { Octokit  } from '@octokit/rest';
import { getError } from '../utilits/helpers';

type UserData = {
  username: string;
  name: string;
  bio: string;
  blog: string;
  loggedIn: boolean;
}

type OctokitProviderContext = {
  octokit: Octokit | null;
  setToken: (token: string) => void;
  user: UserData;
  error: string;
  logout: () => void;
};

export type OctokitProviderProps = {
  children: React.ReactNode;
};

const OctokitContext = createContext({} as OctokitProviderContext);

const userInit = {
  username: '',
  name: '',
  bio: '',
  blog: '',
  loggedIn: false,
}

export const OctokitProvider = ({ children }: OctokitProviderProps) => {
  const [octokit, setOctokit] = useState<Octokit | null>(null);
  const [token, setToken] = useState('');
  const [user, setUser] = useState<UserData>(userInit);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!token) return;
    setOctokit(new Octokit({auth: token}))
  }, [token])

  useEffect(() => {
    if (!octokit) return;
    (async () => {
      try {
        const { data } = await octokit.request('/user');
        setUser({
          username: data.login,
          name: data.name,
          blog: data.blog,
          bio: data.bio,
          loggedIn: true,
        });
      } catch (e) {
        setError(getError(e.status))
      }
    })();
  }, [octokit])

  const logout = () => {
    setUser(userInit);
    setToken('')
  }

  return (
    <OctokitContext.Provider
      value={{ setToken, octokit, user, error, logout }}
    >
      {children}
    </OctokitContext.Provider>
  );
};

export const useOctokit = () => useContext(OctokitContext);
