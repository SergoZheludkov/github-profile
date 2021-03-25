import React, {createContext, useContext, useEffect, useState} from 'react';
import { Octokit  } from '@octokit/rest';
import { getError } from '../utilits/helpers';
import { useLocalStorage } from "./LocalStorageProvider";

interface UserUpdateData {
  name: string;
  bio: string;
  blog: string;
}

interface UserData extends UserUpdateData {
  username: string;
  loggedIn: boolean;
}

type OctokitProviderContext = {
  octokit: Octokit | null;
  user: UserData;
  error: string;
  logout: () => void;
  update: (values: UserUpdateData) => void;
  successUpdate: boolean;
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
  const { token, removeToken } = useLocalStorage();
  const [user, setUser] = useState<UserData>(userInit);
  const [error, setError] = useState<string>('');
  const [successUpdate, setSuccess] = useState(false);

  const clearError = () => setTimeout(() => setError(''), 2000);
  const clearSuccess = () => setTimeout(() => setSuccess(false), 2000);

  useEffect(() => {
    if (!token) return;
    setOctokit(new Octokit({ auth: token }))
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
        setError(getError(e.status));
        clearError();
      }
    })();
  }, [octokit])

  const logout = () => {
    setUser(userInit);
    removeToken();
  }

  const updateUserData = async (values: UserUpdateData) => {
    if (!octokit) return;
    try {
      const res = await octokit.users.updateAuthenticated({ ...values });
      if (res.status === 200) {
        setSuccess(true)
        clearSuccess();
      }
    } catch (e) {
      setError(getError(e.status))
      clearError();
    }
  };

  return (
    <OctokitContext.Provider
      value={{
        octokit,
        user,
        error,
        logout,
        update: updateUserData,
        successUpdate,
      }}
    >
      {children}
    </OctokitContext.Provider>
  );
};

export const useOctokit = () => useContext(OctokitContext);
