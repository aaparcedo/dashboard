import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Contacts = () => {
  const [user, loading, error] = useAuthState(auth);
  const [contacts, setContacts] = useState([]);
  const contactsCollectionRef = collection(db, "contacts");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const getContacts = async () => {
    try {
      const data = await getDocs(contactsCollectionRef);
      setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      // Perform any necessary clean-up tasks here
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(contactsCollectionRef, (snapshot) => {
      const updatedContacts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setContacts(updatedContacts);
    });

    return unsubscribe; // This function will be called when the component unmounts to stop listening to the snapshot
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.4 },

    {
      field: "name",
      headerName: "Name",
      flex: 0.9,
      cellClassName: "name-column--cell",
    },

    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },

    { field: "phone", headerName: "Phone Number", flex: 1 },

    { field: "email", headerName: "Email", flex: 1 },

    { field: "address", headerName: "Address", flex: 1 },

    { field: "city", headerName: "City", flex: 1 },

    { field: "zipcode", headerName: "Zip Code", flex: 1 },
  ];


  function handleRowClick(event) {
    // Get the client id from the data-id attribute of the clicked row
    // console.log(event);
    const clientId = event['id'];
    console.log(contacts[clientId]);
  
    // Use the `useHistory` hook to access the `history` object
    // and navigate to the client details page
    
    navigate(`/clients/${clientId}`);
  }

  return (
    user && (
      <Box m="20px">
        <Header title="CONTACTS" subtitle={user.age} />
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
            rows={contacts}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            onRowClick={handleRowClick}
          />
        </Box>
      </Box>
    )
  );
};

export default Contacts;
