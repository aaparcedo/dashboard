import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px"> 
                <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

                <Accordion defaultExpanded > 
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color={colors.greenAccent[500]} variant="h5">
                            An important question
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Lorem ipsum dolor sit amet. Est deserunt soluta qui quasi mollitia
                        quo minima illum ut vero accusantium sit magni voluptates non natus enim.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded > 
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color={colors.greenAccent[500]} variant="h5">
                            Another important question
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Lorem ipsum dolor sit amet. Est deserunt soluta qui quasi mollitia
                        quo minima illum ut vero accusantium sit magni voluptates non natus enim.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color={colors.greenAccent[500]} variant="h5">
                            Your favorite question
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Lorem ipsum dolor sit amet. Est deserunt soluta qui quasi mollitia
                        quo minima illum ut vero accusantium sit magni voluptates non natus enim.
                        </Typography>
                    </AccordionDetails>
                </Accordion >

                <Accordion defaultExpanded >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color={colors.greenAccent[500]} variant="h5">
                            A random question
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Lorem ipsum dolor sit amet. Est deserunt soluta qui quasi mollitia
                        quo minima illum ut vero accusantium sit magni voluptates non natus enim.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color={colors.greenAccent[500]} variant="h5">
                            The weird question
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Lorem ipsum dolor sit amet. Est deserunt soluta qui quasi mollitia
                        quo minima illum ut vero accusantium sit magni voluptates non natus enim.
                        </Typography>
                    </AccordionDetails>
                </Accordion >

    </Box>
    );
};

export default FAQ;