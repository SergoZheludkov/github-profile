import React, { createContext, useContext, useEffect, useState } from 'react';
import { useOctokit } from './OctokitProvider';
import { getError } from '../utilits/helpers';

interface Repo {
  name: string;
  language: string;
  stars: number;
}

export type ReposProviderContext = {
  repos: Repo[];
  error: string;
  update: () => void;
};

type ReposProviderProps = {
  children: React.ReactNode;
};

const ReposContext = createContext({} as ReposProviderContext);

export const ReposProvider = ({ children }: ReposProviderProps) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState('');
  const { user: { username }, logout, octokit } = useOctokit();

  const update = async () => {
    if (!octokit) return;
    try {
      const { data } = await octokit.request(`/users/${username}/repos`);
      const _repos = data.map((elem: any) => ({
        name: elem.name,
        language: elem.language,
        stars: elem.stargazers_count
      }));
      setRepos(_repos);
      console.log('success');
    } catch (e) {
      setError(getError(e.status))
    }
  }

  useEffect(() => {
    if (!logout) return;
    update();
  }, [logout, octokit])


  return (
    <ReposContext.Provider
      value={{ repos, error, update }}
    >
      {children}
    </ReposContext.Provider>
  );
};

export const useRepos = () => useContext(ReposContext);
