import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ClientDetails = () => {
  const [user, loading, error] = useAuthState(auth);
  const [clients, setClients] = useState([]);
  const clientsCollectionRef = collection(db, "clients");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const id = useParams();
  const clientId = id["id"] - 1;

  const getClients = async () => {
    try {
      const data = await getDocs(clientsCollectionRef);
      setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      // console.error(error);
    } finally {
      // Perform any necessary clean-up tasks here
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(clientsCollectionRef, (snapshot) => {
      const updatedClients = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setClients(updatedClients);
    });

    return unsubscribe; // This function will be called when the component unmounts to stop listening to the snapshot
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  let client;

  // console.log(client);

  if (clients[clientId]) {
    client = clients[clientId];
  }
  // console.log(client);

  let columns = [];
  let rows = [];

  if (client) {
    columns = [
      { field: "id", headerName: "Key", width: 150 },
      { field: "value", headerName: "Value", width: 130 },
    ];

    rows = [
      { id: "First Name", value: client.firstName },
      { id: "Last Name", value: client.lastName },
    ];
  }

  console.log(rows);
  // console.log(columns);

  return (
    client && (
      // <Box
      //   display="flex"
      //   flexDirection="column"
      //   justifyContent="center"
      //   alignItems="center"
      // >
      //   {/* <Header title="CLIENT DETAILS" subtitle="Client details page" /> */}
      //   <Box>
      //     <Typography>First Name: {client.firstName}</Typography>
      //     <Typography>Last Name: {client.lastName}</Typography>
      //     <Typography>Email: {client.email}</Typography>
      //   </Box>
      //   {/* <Box bgcolor="gray" width= '25%'>
      //     <Typography>here</Typography>
      //   </Box> */}
      // </Box>
      <div>
        <Box sx={{ height: 400, width: "50%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </Box>
      </div>
    )
  );
};

export default ClientDetails;
