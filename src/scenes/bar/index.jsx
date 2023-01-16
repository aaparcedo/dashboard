import { Box } from "@mui/material";
import Header from "../../components/BarChart";
import BarChart from "../../components/BarChart";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

const Bar = () => {

    const [user, loading, error] = useAuthState(auth);
    const navigate  = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate('/');;
        }
      }, [user, navigate]);

    return (user && (
        <Box m="20px">
            <Header title="Bar Chart" subtitle="Simple Bar chart" />
            <Box height="75vh">
                <BarChart />
            </Box>
        </Box>
    ));
};

export default Bar;