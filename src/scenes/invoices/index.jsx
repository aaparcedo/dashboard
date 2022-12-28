import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot} from "firebase/firestore";

const Invoices = () => {
  const [user, loading, error] = useAuthState(auth);
  const [invoices, setInvoices] = useState([]);
  const invoicesCollectionRef = collection(db, "invoices");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getInvoices = async () => {
    try {
      const data = await getDocs(invoicesCollectionRef);
      setInvoices(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      // Perform any necessary clean-up tasks here
    }
  };
  
  useEffect(() => {
    const unsubscribe = onSnapshot(invoicesCollectionRef, (snapshot) => {
      const updatedInvoices = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setInvoices(updatedInvoices);
    });
  
    return unsubscribe; // This function will be called when the component unmounts to stop listening to the snapshot
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell"},

    {field: "phone", headerName: "Phone Number", flex: 1},

    {field: "email", headerName: "Email", flex: 1},

    {field: "cost", headerName: "Cost", flex: 1,
        renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
                ${params.row.cost}
            </Typography>
        )
      },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (user && (
    <Box m="20px">
      <Header
        title="INVOICES"
        subtitle="List of Invoice Balances"
      />
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
          rows={invoices}
          columns={columns}
        />
      </Box>
    </Box>
  ));
};

export default Invoices;