import React from 'react';
import logo from './logo.svg';
import './App.scss';
import TeamPage from './pages/TeamPage';
import {Router, Route, Switch} from 'react-router-dom';
import Team from './components/Team';
import history from './history';
import DocumentUpload from './pages/DocumentUpload';
import Parent from './pages/Parent';

function App() {
  return (
    <div className="App">
      <Router history={history}>
          <Switch>
            <Route exact={true} path="/" component={DocumentUpload}/>
            <Route exact={true} path="/parent" component={Parent}/>
            <Route exact={true} path="/teams" component={TeamPage}/>
            <Route exact={true} path="/teams/:teamName" component={Team}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
