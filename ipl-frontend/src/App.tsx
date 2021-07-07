import React from 'react';
import logo from './logo.svg';
import './App.css';
import TeamPage from './pages/TeamPage';
import {Router, Route, Switch} from 'react-router-dom';
import Team from './components/Team';
import history from './history';

function App() {
  return (
    <div className="App">
      <Router history={history}>
          <Switch>
            <Route exact={true} path="/teams" component={TeamPage}/>
            <Route exact={true} path="/teams/:teamName" component={Team}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
