import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";

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
  email: yup.string().email("Invalid email"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  // THIS HAS TO BE CHANGED TO A VALID DATE OF BIRTH INSTEAD OF JUST A STRING
  dateOfBirth: yup.string(),
  streetAddress: yup.string(),
  city: yup.string(),
  zipCode: yup.string(),
  civilStatus: yup.string(),
  alienNumber: yup.string(),
  visaNumber: yup.string(),
  i94Number: yup.string(),
  dateOfArrival: yup.string(),
  immigrationStatusOnArrival: yup.string(),
  currentImmigrationStatus: yup.string(),
  religion: yup.string(),
  weight: yup.string(),
  height: yup.string(),
  eyeColor: yup.string(),
  hairColor: yup.string(),
  uscisLogin: yup.string(),
  uscisPass: yup.string(),
});

const Form = () => {
  const [
    user,
    //  loading,
    // error
  ] = useAuthState(auth);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const clientsCollectionRef = collection(db, "clients");
  const handleFormSubmit = async (values) => {
    await addDoc(clientsCollectionRef, {
      name: initialValues.firstName,
    });
  };

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");


  const createUser = async () => {
    await addDoc(clientsCollectionRef, { firstName: newFirstName, lastName: newLastName, phone: newPhoneNumber});
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
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
                  onChange={(event) => { setNewFirstName(event.target.value);}}
                  value={newFirstName}
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
                  onChange={(event) => { setNewLastName(event.target.value);}}
                  value={newLastName}
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
                  onChange={(event) => { setNewPhoneNumber(event.target.value);}}
                  value={newPhoneNumber}
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
                  error={
                    !!touched.immigrationStatusOnArrival &&
                    !!errors.immigrationStatusOnArrival
                  }
                  helperText={
                    touched.immigrationStatusOnArrival &&
                    errors.immigrationStatusOnArrival
                  }
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
                  error={
                    !!touched.currentImmigrationStatus &&
                    !!errors.currentImmigrationStatus
                  }
                  helperText={
                    touched.currentImmigrationStatus &&
                    errors.currentImmigrationStatus
                  }
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
                <Button onClick={createUser} type="submit" color="secondary" variant="contained">
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
