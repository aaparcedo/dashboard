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

const Cases = () => {
  const [user, loading, error] = useAuthState(auth);
  const [cases, setCases] = useState([]);
  const casesCollectionRef = collection(db, "cases");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const getCases = async () => {
    try {
      const data = await getDocs(casesCollectionRef);
      setCases(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      // Perform any necessary clean-up tasks here
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(casesCollectionRef, (snapshot) => {
      const updatedCases = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCases(updatedCases);
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
      field: "caseType",
      headerName: "Case Type",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    { field: "primaryFiler", headerName: "Primary Filer", flex: 1 },

    {
      field: "dateFiled",
      headerName: "Date Filed",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },

    { field: "caseFormCode", headerName: "Form Code", flex: 1 },
  ];

  function handleRowClick(event) {
    // Get the client id from the data-id attribute of the clicked row
    // console.log(event);
    const clientId = event["id"];
    // console.log(clientId);

    // Use the `useHistory` hook to access the `history` object
    // and navigate to the client details page

    navigate(`/cases/${clientId}`);
  }

  return (
    user && (
      <Box m="20px">
        <Header title="CASES" subtitle={user.age} />
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
            rows={cases}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            onRowClick={handleRowClick}
          />
        </Box>
      </Box>
    )
  );
};

export default Cases;
