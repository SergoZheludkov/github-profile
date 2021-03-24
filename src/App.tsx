import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import { Repos } from './components/Repos';
import { NotFound } from "./components/NotFound";

export const App: React.FC = () => {
  const [loggedIn, setLogged] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) return;
    history.push('/')
  }, [loggedIn])

  if (!loggedIn) return <Login />;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/profile" />
        </Route>
        <Route path="/profile" render={() => <Profile />} />
        <Route path="/repos" render={() => <Repos />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </Router>
  );
};
