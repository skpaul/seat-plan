import React from "react";
import './App.css';
import Login from "./Login";
import Dashboard from "./Dashboard";
import ViewSeatPlan from "./components/ViewSeatPlan";
import TopNav from "./components/TopNav";

import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    
      <Router>
        <TopNav/>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/view-seat-plan" component={ViewSeatPlan} />

          <Redirect to="/"/>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
