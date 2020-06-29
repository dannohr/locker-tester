import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LockerSystem from "./LockerSystem";
import ServerSetup from "./SetupComponents/ServerSetup";
import LockerSystemSetup from "./SetupComponents/LockerSystemSetup";
import ModbusTest from "./SetupComponents/ModbusTest";
import Setup from "./Setup";
import MenuBar from "./MenuBar";
import Status from "./Status";

import "./App.css";

export default function App() {
  const [activeModbusServer, setServer] = useState({ ip: "1.2.3.4" });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/v1/activeModbusServer");
      // console.log(result.data[0]);
      setServer(result.data[0]);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <MenuBar activeModbusServer={activeModbusServer} />
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/server">
              <ServerSetup />
            </Route>
            <Route path="/test">
              <ModbusTest />
            </Route>
            <Route path="/setup">
              <Setup />
            </Route>
            <Route path="/status">
              <Status />
            </Route>
            <Route path="/lockersystemsetup">
              <LockerSystemSetup />
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
