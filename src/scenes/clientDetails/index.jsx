import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// THIS FUNCTION RETURNS THE INFORMATION OF ALL THE CLIENTS
// NEED TO CHANGE THE FETCH TO ONLY GET DATA FROM ONE CLIENT AT A TIME
// RIGHT NOW IS FINE CAUSE WE ONLY HAVE FEW CLIENTS BUT WILL NEED TO FIX BEFORE WE ADD MORE CLIENTS
const Contacts = () => {
  const [user, loading, error] = useAuthState(auth);
  const [contacts, setContacts] = useState([]);
  const contactsCollectionRef = collection(db, "contacts");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const id = useParams();

  const userID = id["id"];

  const getContacts = async () => {
    try {
      const data = await getDocs(contactsCollectionRef);
      setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error(error);
    } finally {
      // Perform any necessary clean-up tasks here
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(contactsCollectionRef, (snapshot) => {
      const updatedContacts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setContacts(updatedContacts);
    });

    return unsubscribe; // This function will be called when the component unmounts to stop listening to the snapshot
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>{contacts[userID].name}</h1>
      <h2>{contacts[userID].email}</h2>
      <h3>{contacts[userID].phone}</h3>
    </div>
  );
};

export default Contacts;
