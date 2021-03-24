import React  from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { useOctokit } from "./contexts/OctokitProvider";
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import { Repos } from './components/Repos';
import { NotFound } from "./components/NotFound";
import { ReposProvider } from "./contexts/ReposProvider";

export const App: React.FC = () => {
  const { user: { loggedIn } } = useOctokit();

  if (!loggedIn) return <Login />;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/profile" />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/repos">
          <ReposProvider>
            <Repos />
          </ReposProvider>
        </Route>
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </Router>
  );
};
