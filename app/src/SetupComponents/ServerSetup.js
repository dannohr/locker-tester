import React, { useState, useEffect } from "react";
import axios from "axios";

import CommonTable from "../CommonComponents/CommonTable";

export default function ServerSetup() {
  const [data, setData] = useState([]);
  // const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3001/api/v1/modbus");

      setData(result.data);
    };

    fetchData();
  }, []);

  let columns = [
    { title: "IP Address", field: "ip" },
    {
      title: "port",
      field: "port",
    },
    { title: "# of Cards", field: "numcards", type: "numeric" },
    {
      title: "Active",
      field: "active",
    },
  ];

  return (
    <CommonTable
      title="WAGO Devices"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            console.log(newData);
            setTimeout(() => {
              axios.post("/api/v1/modbus/", {
                ip: newData.ip,
                port: newData.port,
                numcards: newData.numcards,
                active: newData.active,
              });
              // .then((res) => console.log(res));
              setData([...data, newData]);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              axios.put("/api/v1/modbus/" + newData.id, {
                ip: newData.ip,
                port: newData.port,
                numcards: newData.numcards,
                active: newData.active,
              });
              setData([...dataUpdate]);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              //removes the row that's being deleted
              dataDelete.splice(index, 1);
              axios.delete("/api/v1/modbus/" + oldData.id, {});
              // .then((res) => console.log(res));
              setData(dataDelete);
              resolve();
            }, 1000);
          }),
      }}
    />
  );
}
