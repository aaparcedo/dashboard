import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

const Line = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate  = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');;
    }
  }, [user, navigate]);

  return (user && (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  ));
};

export default Line;