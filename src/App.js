import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import UserList from './pages/UserList'
import Login from './pages/Login'

function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/user" component={UserList}/>
            <Route path="/login" component={Login}/>
        </Switch>
  </Router>
  );
}

export default App;
