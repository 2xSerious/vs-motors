// import "./App.css";
import React from "react";

import Header from "./components/Header";
import PartsList from "./components/parts/PartsList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Customers from "./components/customers/Customers";
import Suppliers from "./components/suppliers/Suppliers";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Switch>
            <Route path="/orders" component={PartsList} />
            <Route path="/clients" component={Customers} />
            <Route path="/suppliers" component={Suppliers} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
