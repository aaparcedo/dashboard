import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const initialValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  streetAddress: "",
  city: "",
  zipCode: "",
  civilStatus: "",
  alienNumber: "",
  visaNumber: "",
  i94Number: "",
  dateOfArrival: "",
  immigrationStatusOnArrival: "",
  currentImmigrationStatus: "",
  religion: "",
  weight: "",
  height: "",
  eyeColor: "",
  hairColor: "",
  uscisLogin: "",
  uscisPass: "",
};

const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  // THIS HAS TO BE CHANGED TO A VALID DATE OF BIRTH INSTEAD OF JUST A STRING
  dateOfBirth: yup.string().required("required"),
  streetAddress: yup.string().required("required"),
  city: yup.string().required("required"),
  zipCode: yup.string().required("required"),
  civilStatus: yup.string().required("required"),
  alienNumber: yup.string().required("required"),
  visaNumber: yup.string().required("required"),
  i94Number: yup.string().required("required"),
  dateOfArrival: yup.string().required("required"),
  immigrationStatusOnArrival: yup.string().required("required"),
  currentImmigrationStatus: yup.string().required("required"),
  religion: yup.string().required("required"),
  weight: yup.string().required("required"),
  height: yup.string().required("required"),
  eyeColor: yup.string().required("required"),
  hairColor: yup.string().required("required"),
  uscisLogin: yup.string().required("required"),
  uscisPass: yup.string().required("required"),
});

const Form = () => {
  const [
    user,
    //  loading,
    // error
  ] = useAuthState(auth);
  const navigate  = useNavigate();

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (!user) {
      navigate('/');;
    }
  }, [user, navigate]);
  
  return (
    user && (
      <Box m="20px">
        <Header title="CREATE USER" subtitle="Create a New User Profile" />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span-4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Date Of Birth"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dateOfBirth}
                  name="dateOfBirth"
                  error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                  helperText={touched.dateOfBirth && errors.dateOfBirth}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Street Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address1}
                  name="streetAddress"
                  error={!!touched.address1 && !!errors.address1}
                  helperText={touched.address1 && errors.address1}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  error={!!touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Zip Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.zipCode}
                  name="zipCode"
                  error={!!touched.zipCode && !!errors.zipCode}
                  helperText={touched.zipCode && errors.zipCode}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Civil Status"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.civilStatus}
                  name="civilStatus"
                  error={!!touched.civilStatus && !!errors.civilStatus}
                  helperText={touched.civilStatus && errors.civilStatus}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Alien Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.alienNumber}
                  name="alienNumber"
                  error={!!touched.alienNumber && !!errors.alienNumber}
                  helperText={touched.alienNumber && errors.alienNumber}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Visa Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.visaNumber}
                  name="visaNumber"
                  error={!!touched.visaNumber && !!errors.visaNumber}
                  helperText={touched.visaNumber && errors.visaNumber}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="I-94"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.i94Number}
                  name="i94Number"
                  error={!!touched.i94Number && !!errors.i94Number}
                  helperText={touched.i94Number && errors.i94Number}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Date of Arrival Into US"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dateOfArrival}
                  name="dateOfArrival"
                  error={!!touched.dateOfArrival && !!errors.dateOfArrival}
                  helperText={touched.dateOfArrival && errors.dateOfArrival}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Immigration Status Upon Arrival"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.immigrationStatusOnArrival}
                  name="immigrationStatusOnArrival"
                  error={!!touched.immigrationStatusOnArrival && !!errors.immigrationStatusOnArrival}
                  helperText={touched.immigrationStatusOnArrival && errors.immigrationStatusOnArrival}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Current Immigration Status"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.currentImmigrationStatus}
                  name="currentImmigrationStatus"
                  error={!!touched.currentImmigrationStatus && !!errors.currentImmigrationStatus}
                  helperText={touched.currentImmigrationStatus && errors.currentImmigrationStatus}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Religion"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.religion}
                  name="religion"
                  error={!!touched.religion && !!errors.religion}
                  helperText={touched.religion && errors.religion}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Weight"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.weight}
                  name="weight"
                  error={!!touched.weight && !!errors.weight}
                  helperText={touched.weight && errors.weight}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Height"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.height}
                  name="height"
                  error={!!touched.height && !!errors.height}
                  helperText={touched.height && errors.height}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Eye Color"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.eyeColor}
                  name="eyeColor"
                  error={!!touched.eyeColor && !!errors.eyeColor}
                  helperText={touched.eyeColor && errors.eyeColor}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Hair Color"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.hairColor}
                  name="hairColor"
                  error={!!touched.hairColor && !!errors.hairColor}
                  helperText={touched.hairColor && errors.hairColor}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="USCIS Login"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.uscisLogin}
                  name="uscisLogin"
                  error={!!touched.uscisLogin && !!errors.uscisLogin}
                  helperText={touched.uscisLogin && errors.uscisLogin}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="USCIS Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.uscisPass}
                  name="uscisPass"
                  error={!!touched.uscisPass && !!errors.uscisPass}
                  helperText={touched.uscisPass && errors.uscisPass}
                  sx={{ gridColumn: "span 4" }}
                />
                
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create New User
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    )
  );
};

export default Form;