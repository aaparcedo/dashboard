import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from "../../firebase";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

const Contacts = () => {

  const [user, loading, error] = useAuthState(auth);
  const [contacts, setContacts] = useState([]);
  const contactsCollectionRef = collection(db, "contacts");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect (() => {
    const getContacts = async () => {
      const data = await getDocs(contactsCollectionRef);
      setContacts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      console.log(data);
    };
    getContacts();
  }, []);

  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (user && (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle={user.age}/>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[500]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={db}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  ));
};

export default Contacts;
