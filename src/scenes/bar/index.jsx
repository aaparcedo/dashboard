import { Box } from "@mui/material";
import Header from "../../components/BarChart";
import BarChart from "../../components/BarChart";

const Bar = () => {
    return(
        <Box m="20px">
            <Header title="Bar Chart" subtitle="Simple Bar chart" />
            <Box height="75vh">
                <BarChart />
            </Box>
        </Box>
    );
};

export default Bar;