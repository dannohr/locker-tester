import React, { useState, useEffect } from "react";
import SelectLockerSystem from "../CommonComponents/SelectLockerSystem";

import axios from "axios";
import "./LockerSystemSetup.css";

export default function LockerSystemSetup() {
  const [lockerSystems, setLockerSystems] = useState([]);
  // const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/v1/lockersystem");

      setLockerSystems(result.data);
    };

    fetchData();
  }, []);

  // console.log("LockerSystemSetup");
  // console.log(lockerSystems);

  return (
    <div className="root">
      <p>Locker System Setup Page</p>
      <SelectLockerSystem lockerSystems={lockerSystems} />
    </div>
  );
}
