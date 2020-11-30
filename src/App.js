import React from "react";
import './App.css';
import Login from "./Login";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <div className="App">
     
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Redirect to="/"/>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
