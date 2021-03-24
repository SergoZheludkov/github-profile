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
};

type ReposProviderProps = {
  children: React.ReactNode;
};

const ReposContext = createContext({} as ReposProviderContext);

export const ReposProvider = ({ children }: ReposProviderProps) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState('');
  const { user: { username }, logout, octokit } = useOctokit();

  useEffect(() => {
    if (!logout || !octokit) return;
    (async () => {
      try {
        const { data } = await octokit.request(`/users/${username}/repos`);
        const _repos = data.map((elem: any) => ({
          name: elem.name,
          language: elem.language,
          stars: elem.stargazers_count
        }));
        setRepos(_repos);
      } catch (e) {
        setError(getError(e.status))
      }
    })();
  }, [logout, octokit])


  return (
    <ReposContext.Provider
      value={{ repos, error }}
    >
      {children}
    </ReposContext.Provider>
  );
};

export const useRepos = () => useContext(ReposContext);
