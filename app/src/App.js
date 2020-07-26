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
  const [activeLockerSystem, setLockerSystem] = useState(null);

  useEffect(() => {
    const fetchModbusData = async () => {
      const result = await axios("/api/v1/activeModbusServer");
      console.log(result.data[0]);
      setServer(result.data[0]);
    };
    const fetchLockerData = async () => {
      const result = await axios("/api/v1/activeLockerSystem");
      console.log(result.data[0]);
      setLockerSystem(result.data[0]);
    };

    fetchModbusData();
    fetchLockerData();
  }, []);

  return (
    <div className="App">
      <Router>
        {activeLockerSystem ? (
          <MenuBar
            activeModbusServer={activeModbusServer}
            activeLockerSystem={activeLockerSystem}
          />
        ) : null}

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
              {activeLockerSystem ? (
                <LockerSystem activeLockerSystem={activeLockerSystem} />
              ) : null}
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
