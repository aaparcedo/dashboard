import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ClientList from "../../components/ClientList";

const CaseDetails = () => {
  const [clientCase, setClientCase] = useState([]);
  const id = useParams();
  const caseId = id["id"];
  let docSnap;

  const docRef = doc(db, "cases", caseId);
  const getCase = async () => {
    docSnap = await getDoc(docRef);
    setClientCase(docSnap.data());
  };
  useEffect(() => {
    getCase();
  }, []);
  // console.log(clientCase);
  // console.log(docSnap.data());

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // const getCases = async () => {
  //   try {
  //     const data = await getDocs(casesCollectionRef);
  //     setCases(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   } catch (error) {
  //     // console.error(error);
  //   } finally {
  //     // Perform any necessary clean-up tasks here
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(casesCollectionRef, (snapshot) => {
  //     const updatedCases = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setCases(updatedCases);
  //   });

  //   return unsubscribe; // This function will be called when the component unmounts to stop listening to the snapshot
  // }, []);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  // THIS IS JUST ASSIGNING THE VERY FIRST CASE IN THE DB
  // if (cases[0]) {
  //   clientCase = cases[0];
  // }
  // console.log(clientCase);

  let columns = [];
  let rows = [];

  if (clientCase) {
    columns = [
      { field: "id", headerName: "Key", width: 250 },
      { field: "value", headerName: "Value", width: 300 },
    ];

    rows = [
      { id: "Case Type", value: clientCase.caseType },
      { id: "Primary Filer", value: clientCase.primaryFiler },
      { id: "Date Filed", value: clientCase.dateFiled },
      { id: "Form Number", value: clientCase.caseFormCode },
    ];
  }

  return (
    clientCase && (
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
            height: "55%",
            width: 600,
            justifyContent: "center",
            alignItems: "bottom",
            mx: "auto",
            // my: "auto"
          }}
        >
          <Header title="Case Details" />
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{ justifyContent: "center" }}
            pageSize={4}
            rowsPerPageOptions={[4]}
          />
        </Box>
        <Box sx={{m: 5}}>
          <ClientList props={clientCase.members}></ClientList>
        </Box>
      </Box>
    )
  );
};

export default CaseDetails;
