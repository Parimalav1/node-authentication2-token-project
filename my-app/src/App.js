import React from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import {Home, Header} from './components/Home';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
    <div className="App">
        <Header />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path='/' component={Home} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
