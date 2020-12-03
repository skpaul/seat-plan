import React from "react";
import './App.css';
import Login from "./Login";
import Dashboard from "./Dashboard";
import ViewSeatPlan from "./components/ViewSeatPlan";
import CreateSeatPlan from "./components/CreateSeatPlan";
import SelectBuilding from "./components/SelectBuilding";
import CreateBuilding from "./components/CreateBuilding";
import SelectFloor from "./components/SelectFloor";
import CreateFloor from "./components/CreateFloor";

import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    
      <Router>
        
        <Switch>
        <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
         

          <Route exact path="/dashboard" component={Dashboard} />
          {/* <Link to="">Create Seat Plan</Link> */}
          <Route exact path="/seat-plan/new/select-exam" component={CreateSeatPlan} />
          <Route path="/seat-plan/new/select-building" component={SelectBuilding} />
          <Route path="/seat-plan/new/create-building" component={CreateBuilding} />
          <Route path="/seat-plan/new/select-floor" component={SelectFloor} />
          <Route path="/seat-plan/new/create-floor" component={CreateFloor} />
          <Route exact path="/view-seat-plan" component={ViewSeatPlan} />
          <Redirect to="/"/>
        </Switch>
      </Router>
    </div>
  );

  
}

export default App;
