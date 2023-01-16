import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { spacing } from "@mui/system";

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

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  let client;

  if (clients[clientId]) {
    client = clients[clientId];
  }

  let columns = [];
  let rows = [];

  if (client) {
    columns = [
      { field: "id", headerName: "Key", width: 250 },
      { field: "value", headerName: "Value", width: 300 },
    ];

    rows = [
      { id: "First Name", value: client.firstName },
      { id: "Last Name", value: client.lastName },
      { id: "Date of Birth", value: client.dateOfBirth },
      { id: "Email", value: client.email },
      { id: "Phone Number", value: client.phone },
      { id: "Street Address", value: client.streetAddress },
      { id: "City", value: client.city },
      { id: "Zip Code", value: client.zipCode },
      { id: "Civil Status", value: client.civilStatus },
      { id: "Alien Number", value: client.alienNumber },
      { id: "Visa Number", value: client.visaNumber },
      { id: "I-94", value: client.i94Number },
      { id: "Date of Arrival Into the US", value: client.dateOfArrival },
      {
        id: "Current Immigration Status",
        value: client.currentImmigrationStatus,
      },
      { id: "Religion", value: client.religion },
      { id: "Weight", value: client.weight },
      { id: "Height", value: client.height },
      { id: "Eye Color", value: client.eyeColor },
      { id: "Hair Color", value: client.hairColor },
      { id: "USCIS Login", value: client.uscisLogin },
      { id: "USCIS Password", value: client.uscisPass },
    ];
  }

  return (
    client && (
      <Box
        m="20px"
        sx={{
          display: "flex",
          // flexDirection: 'column',
          // justifyContent: "center",
          height: "100%",
          // mx: "auto",
          my: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: 600,
            justifyContent: "center",
            alignItems: "bottom",
            mx: "auto",
            // my: "auto"
          }}
        >
          <Header title="Client Details" />
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{ justifyContent: "center" }}
            pageSize={21}
          />
        </Box>
      </Box>
    )
  );
};

export default ClientDetails;
