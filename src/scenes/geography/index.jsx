import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";
import { tokens } from "../../theme";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Geography = () => {
  const [
    user,
    //  loading,
    // error
  ] = useAuthState(auth);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    user && (
      <Box m="20px">
        <Header title="Geography" subtitle="Simple Geography Chart" />

        <Box
          height="75vh"
          border={`1px solid ${colors.grey[100]}`}
          borderRadius="4px"
        >
          <GeographyChart />
        </Box>
      </Box>
    )
  );
};

export default Geography;
