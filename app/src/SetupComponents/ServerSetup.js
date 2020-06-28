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

// import React from "react";
// // import { render } from "react-dom";
// import axios from "axios";

// import ReactTable from "react-table";
// import "react-table/react-table.css";

// import KeyboardedInput from "react-touch-screen-keyboard";
// import "react-touch-screen-keyboard/lib/Keyboard.css";

// import "./ServerSetup.css";

// class ServerSetup extends React.Component {
//   constructor() {
//     super();
//     this.state = { modbusServer: [] };
//   }

//   toggleCheck(id) {
//     const modbusServer = [...this.state.modbusServer];
//     let rowIndex = modbusServer.findIndex(function (x) {
//       return x.id === id;
//     });

//     modbusServer[rowIndex].checked = !modbusServer[rowIndex].checked;
//     modbusServer[rowIndex].active = !modbusServer[rowIndex].active;

//     this.setState({ modbusServer: modbusServer });
//   }

//   handleSaveButtonClick(e, modbusServer) {
//     axios.post(`http://localhost:3001/api/v1/modbus`, modbusServer);
//   }

//   componentDidMount() {
//     axios.get(`http://localhost:3001/api/v1/modbus`).then((res) => {
//       this.setState({ modbusServer: res.data });
//     });
//   }

//   handleValueChange(original, val) {
//     const modbusServer = [...this.state.modbusServer];
//     let rowIndex = modbusServer.findIndex(function (x) {
//       return x.id === original.id;
//     });
//     modbusServer[rowIndex][Object.keys(val)] = val[Object.keys(val)];
//     this.setState({ modbusServer: modbusServer });
//   }

//   render() {
//     const { modbusServer } = this.state;
//     console.log(this.state);

//     return (
//       <div className="root">
//         <h1> Edit Modbus Server Settings </h1>

//         <div className="modbus-setup-table">
//           <ReactTable
//             data={modbusServer}
//             columns={[
//               {
//                 Header: "Active",
//                 maxWidth: 75,
//                 Cell: ({ original }) => {
//                   return (
//                     <input
//                       type="checkbox"
//                       className="double"
//                       checked={original.checked === true}
//                       onChange={() => this.toggleCheck(original.id)}
//                     />
//                   );
//                 },
//               },
//               {
//                 Header: "IP Address",
//                 Cell: ({ original }) => {
//                   return (
//                     <KeyboardedInput
//                       value={original.ip}
//                       inputClassName="table-field"
//                       onChange={(val) =>
//                         this.handleValueChange(original, { ip: val })
//                       }
//                       placeholder={"IP Address"}
//                       enabled
//                     />
//                   );
//                 },
//               },

//               {
//                 Header: "Port",
//                 Cell: ({ original }) => {
//                   return (
//                     <KeyboardedInput
//                       value={original.port.toString()}
//                       inputClassName="table-field"
//                       onChange={(val) =>
//                         this.handleValueChange(original, { port: val })
//                       }
//                       placeholder={"Port"}
//                       enabled
//                     />
//                   );
//                 },
//               },

//               {
//                 Header: "Number of Cards",
//                 Cell: ({ original }) => {
//                   return (
//                     <KeyboardedInput
//                       value={original.numcards.toString()}
//                       inputClassName="table-field"
//                       onChange={(val) =>
//                         this.handleValueChange(original, { numcards: val })
//                       }
//                       placeholder={"Cards"}
//                       enabled
//                     />
//                   );
//                 },
//               },
//               {
//                 Header: "",
//                 id: "checkbox",
//                 accessor: "",
//                 maxWidth: 75,
//                 Cell: ({ original }) => {
//                   return (
//                     <button
//                       type="button"
//                       onClick={(e) => this.handleSaveButtonClick(e, original)}
//                     >
//                       Save
//                     </button>
//                   );
//                 },
//               },
//             ]}
//             defaultPageSize={10}
//             className="-striped -highlight"
//           />
//           <br />
//         </div>
//       </div>
//     );
//   }
// }

// export default ServerSetup;
