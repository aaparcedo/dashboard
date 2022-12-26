import { Box } from "@mui/material";
import Header from "../../components/BarChart";
import BarChart from "../../components/BarChart";

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

const Bar = () => {

    const [user, loading, error] = useAuthState(auth);

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