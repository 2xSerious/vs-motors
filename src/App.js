// import "./App.css";
import React from "react";

import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Customers from "./components/customers/Customers";
import Suppliers from "./components/suppliers/Suppliers";
import Workers from "./components/workers/Workers";
import Vehicles from "./components/vehicles/Vehicles";
import Orders from "./components/orders/Orders";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Switch>
            <Route path="/clients" component={Customers} />
            <Route path="/suppliers" component={Suppliers} />
            <Route path="/workers" component={Workers} />
            <Route path="/vehicles" component={Vehicles} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
