import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

const Pie = () => {
  const [user,
    //  loading,
      // error
    ] = useAuthState(auth);

  return (user && (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  ));
};

export default Pie;