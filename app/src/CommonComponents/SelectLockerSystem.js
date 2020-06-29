import React, { useState, useEffect } from "react";
import axios from "axios";

import CommonTable from "../CommonComponents/CommonTable";

export default function SelectLockerSystem(props) {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  let columns = [
    { title: "Active", field: "active" },
    { title: "Name", field: "systemName" },
    {
      title: "Description",
      field: "Description",
    },
    { title: "# of Cards", field: "numOfCards", type: "numeric" },
    { title: "# of Columns", field: "numOfColumns", type: "numeric" },
    { title: "# of Doors", field: "numOfDoors", type: "numeric" },
  ];

  // const [columns, setColumns] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await axios("http://localhost:3001/api/v1/lockersystem");
  //       console.log(result.data);
  //       setData(result.data);
  //     };

  //     fetchData();
  //   }, []);

  console.log(data);
  console.log(props);
  return (
    <CommonTable
      title="Locker Systems"
      columns={columns}
      data={props.lockerSystems}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }
      options={{
        rowStyle: (rowData) => ({
          backgroundColor:
            // selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            rowData.active === 1 ? "#f5ff89" : "#FFF",
        }),
        padding: "dense",
      }}
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
