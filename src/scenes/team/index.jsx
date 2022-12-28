import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from "../../firebase";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot} from "firebase/firestore";

const Team = () => {
  const [user, loading, error] = useAuthState(auth);
  const [team, setTeam] = useState([]);
  const teamCollectionRef = collection(db, "team");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getTeam = async () => {
    try {
      const data = await getDocs(teamCollectionRef);
      setTeam(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      // Perform any necessary clean-up tasks here
    }
  };
  
  useEffect(() => {
    const unsubscribe = onSnapshot(teamCollectionRef, (snapshot) => {
      const updatedTeam = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setTeam(updatedTeam);
    });
  
    return unsubscribe; // This function will be called when the component unmounts to stop listening to the snapshot
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },

    {field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell"},

    {field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left"},

    {field: "phone", headerName: "Phone Number", flex: 1},

    {field: "email", headerName: "Email", flex: 1},

    {field: "accessLevel", headerName: "Access Level", flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[800]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (user && (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid checkboxSelection 
        rows={team} 
        columns={columns}
        components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  ));
};

export default Team;