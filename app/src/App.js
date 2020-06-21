import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LockerSystem from "./LockerSystem";
import ModbusServerSetup from "./SetupComponents/ModbusServerSetup";
import ModbusTest from "./SetupComponents/ModbusTest";
import MenuBar from "./AppBar";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <MenuBar />
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/server">
              <ModbusServerSetup />
            </Route>
            <Route path="/test">
              <ModbusTest />
            </Route>
            <Route exact path="/">
              <LockerSystem />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <MenuBar />
//       <LockerSystem />
//     </div>
//   );
// }

// export default App;
