import React, { useState, forwardRef } from "react";
// import axios from "axios";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

// import KeyboardedInput from "react-touch-screen-keyboard";
// import "react-touch-screen-keyboard/lib/Keyboard.css";

export default function ModbusServerSetup() {
  // const { useState } = React;
  const [data, setData] = useState({});

  // async function getWago() {
  //   const data = await axios
  //     .get(`http://localhost:3001/api/modbus/getMusbusServer`)
  //     .then((res) => {
  //       return res.data;
  //     });
  //   // console.log(res.data);
  //   setData(data);
  //   // res.then((res) => setWago(res.data)).catch((err) => console.log(err));
  // }

  // useEffect(() => {
  //   getWago();
  // }, []);

  const [columns, setColumns] = useState([]);

  setColumns([
    { title: "Active", field: "active" },
    {
      title: "IP Address",
      field: "ip",
    },
    { title: "Port", field: "port", type: "numeric" },
    {
      title: "Num of Cards",
      field: "numcards",
      type: "numeric",
    },
  ]);

  console.log(data);

  return (
    <div>
      {/* {data.length > 0 && ( */}
      <MaterialTable
        title="Setup Wago"
        icons={tableIcons}
        columns={columns}
        // data={data}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = "http://localhost:3001/api/modbus/getMusbusServer";
            fetch(url)
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                setData(result);
                resolve({
                  data: result,
                  page: 0,
                  totalCount: result.length,
                });
              });
          })
        }
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
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
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
      {/* )} */}
    </div>
  );
}

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

// import React from "react";
// import axios from "axios";
// import MaterialTable from "material-table";
// import { Grid, MuiThemeProvider, Button } from "@material-ui/core";
// import { createMuiTheme } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

// // import KeyboardedInput from "react-touch-screen-keyboard";
// // import "react-touch-screen-keyboard/lib/Keyboard.css";

// // class ModbusServerSetup extends React.Component {
// // constructor() {
// //   super();
// //   this.state = { modbusServer: [] };
// // }

// // toggleCheck(id) {
// //   const modbusServer = [...this.state.modbusServer];
// //   let rowIndex = modbusServer.findIndex(function (x) {
// //     return x.id === id;
// //   });

// //   modbusServer[rowIndex].checked = !modbusServer[rowIndex].checked;
// //   modbusServer[rowIndex].active = !modbusServer[rowIndex].active;

// //   this.setState({ modbusServer: modbusServer });
// // }

// // handleSaveButtonClick(e, modbusServer) {
// //   axios.post(
// //     `http://localhost:3001/api/modbus/postMusbusServer`,
// //     modbusServer
// //   );
// // }

// // componentDidMount() {
// //   axios
// //     .get(`http://localhost:3001/api/modbus/getMusbusServer`)
// //     .then((res) => {
// //       this.setState({ modbusServer: res.data });
// //     });
// // }

// // handleValueChange(original, val) {
// //   const modbusServer = [...this.state.modbusServer];
// //   let rowIndex = modbusServer.findIndex(function (x) {
// //     return x.id === original.id;
// //   });
// //   modbusServer[rowIndex][Object.keys(val)] = val[Object.keys(val)];
// //   this.setState({ modbusServer: modbusServer });
// // }

// let direction = "ltr";
// // direction = 'rtl';
// const theme = createMuiTheme({
//   direction: direction,
//   palette: {
//     type: "light",
//   },
// });

// function ModbusServerSetup() {
//   let data = [
//     {
//       id: 1,
//       name: "A1",
//       surname: "B",
//       isMarried: true,
//       birthDate: new Date(1987, 1, 1),
//       birthCity: 0,
//       sex: "Male",
//       type: "adult",
//       insertDateTime: "1994-11-23T08:15:30-05:00",
//       time: new Date(1900, 1, 1, 14, 23, 35),
//     },
//     {
//       id: 2,
//       name: "A2",
//       surname: "B",
//       isMarried: false,
//       birthDate: new Date(1987, 1, 1),
//       birthCity: 34,
//       sex: "Female",
//       type: "adult",
//       insertDateTime: "1994-11-05T13:15:30Z",
//       time: new Date(1900, 1, 1, 14, 23, 35),
//       parentId: 1,
//     },
//     {
//       id: 3,
//       name: "A3",
//       surname: "B",
//       isMarried: true,
//       birthDate: new Date(1987, 1, 1),
//       birthCity: 34,
//       sex: "Female",
//       type: "child",
//       insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
//       time: new Date(1900, 1, 1, 14, 23, 35),
//       parentId: 1,
//     },
//     {
//       id: 4,
//       name: "A4",
//       surname: "Dede Dede Dede Dede Dede Dede Dede Dede",
//       isMarried: true,
//       birthDate: new Date(1987, 1, 1),
//       birthCity: 34,
//       sex: "Female",
//       type: "child",
//       insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
//       time: new Date(1900, 1, 1, 14, 23, 35),
//       parentId: 3,
//     },
//   ];

//   let columns = [
//     {
//       title: "Active",
//       field: "name",
//       filterPlaceholder: "Adı filter",
//       tooltip: "This is tooltip text",
//     },
//     {
//       width: 200,
//       title: "IP Address",
//       field: "surname",
//       initialEditValue: "test",
//       tooltip: "This is tooltip text",
//     },
//     { title: "Port", field: "isMarried" },
//     {
//       title: "Num of Cards",
//       field: "sex",
//       disableClick: true,
//       editable: "onAdd",
//     },
//     { title: "Check", field: "type", removable: false, editable: "never" },
//   ];

//   // let cols1 = {[
//   //   {
//   //     Header: "Active",
//   //     maxWidth: 75,
//   //     Cell: ({ original }) => {
//   //       return (
//   //         <input
//   //           type="checkbox"
//   //           // className="double"
//   //           checked={original.checked === true}
//   //           onChange={() => this.toggleCheck(original.id)}
//   //         />
//   //       );
//   //     },
//   //   },
//   //   {
//   //     Header: "IP Address",
//   //     Cell: ({ original }) => {
//   //       return (
//   //         <KeyboardedInput
//   //           value={original.ip}
//   //           // inputClassName="table-field"
//   //           onChange={(val) =>
//   //             this.handleValueChange(original, { ip: val })
//   //           }
//   //           placeholder={"IP Address"}
//   //           enabled
//   //         />
//   //       );
//   //     },
//   //   },

//   //   {
//   //     Header: "Port",
//   //     Cell: ({ original }) => {
//   //       return (
//   //         <KeyboardedInput
//   //           value={original.port.toString()}
//   //           // inputClassName="table-field"
//   //           onChange={(val) =>
//   //             this.handleValueChange(original, { port: val })
//   //           }
//   //           placeholder={"Port"}
//   //           enabled
//   //         />
//   //       );
//   //     },
//   //   },

//   //   {
//   //     Header: "Number of Cards",
//   //     Cell: ({ original }) => {
//   //       return (
//   //         <KeyboardedInput
//   //           value={original.numcards.toString()}
//   //           // inputClassName="table-field"
//   //           onChange={(val) =>
//   //             this.handleValueChange(original, { numcards: val })
//   //           }
//   //           placeholder={"Cards"}
//   //           enabled
//   //         />
//   //       );
//   //     },
//   //   },
//   //   {
//   //     Header: "",
//   //     id: "checkbox",
//   //     accessor: "",
//   //     maxWidth: 75,
//   //     Cell: ({ original }) => {
//   //       return (
//   //         <button
//   //           type="button"
//   //           onClick={(e) => this.handleSaveButtonClick(e, original)}
//   //         >
//   //           Save
//   //         </button>
//   //       );
//   //     },
//   //   },

//   return (
//     <div>
//       <h1> Edit Modbus Server Settings </h1>

//       <MuiThemeProvider theme={theme}>
//         <div style={{ maxWidth: "100%", direction }}>
//           <Grid container>
//             <Grid item xs={12}>
//               {/* {this.state.selectedRows && this.state.selectedRows.length} */}
//               <MaterialTable
//                 // tableRef={this.tableRef}
//                 columns={columns}
//                 data={data}
//                 title="Demo Title"
//                 options={{
//                   pageSize: 50,
//                   pageSizeOptions: [5, 50, 100],
//                 }}
//                 editable={{
//                   onRowAdd: (newData) =>
//                     new Promise((resolve, reject) => {
//                       setTimeout(() => {
//                         {
//                           /* const data = this.state.data;
//                             data.push(newData);
//                             this.setState({ data }, () => resolve()); */
//                         }
//                         resolve();
//                       }, 1000);
//                     }),
//                   onRowUpdate: (newData, oldData) =>
//                     new Promise((resolve, reject) => {
//                       setTimeout(() => {
//                         {
//                           /* const data = this.state.data;
//                             const index = data.indexOf(oldData);
//                             data[index] = newData;
//                             this.setState({ data }, () => resolve()); */
//                         }
//                         resolve();
//                       }, 1000);
//                     }),
//                   onRowDelete: (oldData) =>
//                     new Promise((resolve, reject) => {
//                       setTimeout(() => {
//                         {
//                           /* let data = this.state.data;
//                             const index = data.indexOf(oldData);
//                             data.splice(index, 1);
//                             this.setState({ data }, () => resolve()); */
//                         }
//                         resolve();
//                       }, 1000);
//                     }),
//                 }}
//                 localization={{
//                   body: {
//                     emptyDataSourceMessage: "No records to display",
//                     filterRow: {
//                       filterTooltip: "Filter",
//                       filterPlaceHolder: "Filtaaer",
//                     },
//                   },
//                 }}
//                 onSearchChange={(e) => console.log("search changed: " + e)}
//                 onColumnDragged={(oldPos, newPos) =>
//                   console.log(
//                     "Dropped column from " + oldPos + " to position " + newPos
//                   )
//                 }
//                 // parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
//               />
//             </Grid>
//           </Grid>
//           {this.state.text}
//           <button
//             onClick={() => this.tableRef.current.onAllSelected(true)}
//             style={{ margin: 10 }}
//           >
//             Select
//           </button>
//           <MaterialTable
//             title={
//               <Typography variant="h6" color="primary">
//                 Remote Data Preview
//               </Typography>
//             }
//             columns={[
//               {
//                 title: "Avatar",
//                 field: "avatar",
//                 render: (rowData) => (
//                   <img
//                     style={{ height: 36, borderRadius: "50%" }}
//                     src={rowData.avatar}
//                   />
//                 ),
//               },
//               {
//                 title: "Id",
//                 field: "id",
//                 filterPlaceholder: "placeholder",
//                 lookup: {
//                   1: "1",
//                   2: "2",
//                   3: "3",
//                   4: "4",
//                   5: "5",
//                   6: "6",
//                   7: "7",
//                   8: "8",
//                   9: "9",
//                   10: "10",
//                   11: "11",
//                   12: "12",
//                 },
//               },
//               { title: "First Name", field: "first_name" },
//               { title: "Last Name", field: "last_name" },
//             ]}
//             options={{
//               filtering: true,
//               grouping: true,
//               groupTitle: (group) => group.data.length,
//               searchFieldVariant: "outlined",
//             }}
//             localization={{
//               toolbar: {
//                 searchPlaceholder: "Outlined Search Field",
//               },
//             }}
//             data={(query) =>
//               new Promise((resolve, reject) => {
//                 let url = "https://reqres.in/api/users?";
//                 url += "per_page=" + query.pageSize;
//                 url += "&page=" + (query.page + 1);
//                 console.log(query);
//                 fetch(url)
//                   .then((response) => response.json())
//                   .then((result) => {
//                     resolve({
//                       data: result.data,
//                       page: result.page - 1,
//                       totalCount: result.total,
//                     });
//                   });
//               })
//             }
//           />
//         </div>
//       </MuiThemeProvider>

//       {/* <div className="modbus-setup-table">
//         <MaterialTable
//           // columns={props.columns}
//           // data={props.data}
//           // title={props.title}
//           columns={columns}
//           data={data}
//           title="My Table"
//           options={{
//             padding: "dense",
//             rowStyle: {
//               // backgroundColor: "#EEE",
//               // color: "black",
//             },
//             cellStyle: {
//               fontSize: 12,
//             },
//             sorting: true,
//           }}
//           editable={{
//             onRowAdd: (newData) =>
//               // console.log(newData);
//               new Promise((resolve, reject) => {
//                 // props.handleAdd(newData);
//                 resolve();
//               }),
//             onRowUpdate: (newData, oldData) =>
//               new Promise((resolve, reject) => {
//                 // props.handleUpdate(newData);
//                 resolve();
//               }),
//             onRowDelete: (oldData) =>
//               new Promise((resolve, reject) => {
//                 // props.handleDelete(oldData.id);
//                 resolve();
//               }),
//           }}
//         /> */}
//       {/* <ReactTable
//           data={modbusServer}
//           columns={[
//             {
//               Header: "Active",
//               maxWidth: 75,
//               Cell: ({ original }) => {
//                 return (
//                   <input
//                     type="checkbox"
//                     // className="double"
//                     checked={original.checked === true}
//                     onChange={() => this.toggleCheck(original.id)}
//                   />
//                 );
//               },
//             },
//             {
//               Header: "IP Address",
//               Cell: ({ original }) => {
//                 return (
//                   <KeyboardedInput
//                     value={original.ip}
//                     // inputClassName="table-field"
//                     onChange={(val) =>
//                       this.handleValueChange(original, { ip: val })
//                     }
//                     placeholder={"IP Address"}
//                     enabled
//                   />
//                 );
//               },
//             },

//             {
//               Header: "Port",
//               Cell: ({ original }) => {
//                 return (
//                   <KeyboardedInput
//                     value={original.port.toString()}
//                     // inputClassName="table-field"
//                     onChange={(val) =>
//                       this.handleValueChange(original, { port: val })
//                     }
//                     placeholder={"Port"}
//                     enabled
//                   />
//                 );
//               },
//             },

//             {
//               Header: "Number of Cards",
//               Cell: ({ original }) => {
//                 return (
//                   <KeyboardedInput
//                     value={original.numcards.toString()}
//                     // inputClassName="table-field"
//                     onChange={(val) =>
//                       this.handleValueChange(original, { numcards: val })
//                     }
//                     placeholder={"Cards"}
//                     enabled
//                   />
//                 );
//               },
//             },
//             {
//               Header: "",
//               id: "checkbox",
//               accessor: "",
//               maxWidth: 75,
//               Cell: ({ original }) => {
//                 return (
//                   <button
//                     type="button"
//                     onClick={(e) => this.handleSaveButtonClick(e, original)}
//                   >
//                     Save
//                   </button>
//                 );
//               },
//             },
//           ]}
//           defaultPageSize={10}
//           className="-striped -highlight"
//           /> */}
//       <br />
//     </div>
//   );
// }

// export default ModbusServerSetup;
