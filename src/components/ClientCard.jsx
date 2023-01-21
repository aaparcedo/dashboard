import { Box, Typography, useTheme, Avatar } from "@mui/material";
import { tokens } from "../theme";

const ClientCard = ({ firstName, lastName, pictureURL, email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="70px"
      width="300px"
      sx={{ borderRadius: '8px' }}
    >
      <Box width="100%" m="0 20px">
        <Box display="flex" flexDirection="row">
          <Avatar alt="client" src={pictureURL} sx={{ width: 50, height: 50 }} />
          <Box mt="10px" ml="10px">
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
              {firstName} {lastName}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientCard;
