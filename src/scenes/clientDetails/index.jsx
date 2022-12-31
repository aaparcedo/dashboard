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

const ClientDetails = () => {
  const [user, loading, error] = useAuthState(auth);
  const [contacts, setContacts] = useState([]);
  const contactsCollectionRef = collection(db, "contacts");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const id = useParams();
  // console.log(id);

  const userID = id["id"] - 1;
  // console.log(userID);

  const getContacts = async () => {
    try {
      const data = await getDocs(contactsCollectionRef);
      setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
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

  console.log(contacts);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  console.log(contacts[userID]);

  return (contacts[userID] && (
    <div>
        hello
      <h1>{contacts[userID].name}</h1>
      <h2>{contacts[userID].email}</h2>
      <h3>{contacts[userID].phone}</h3>
    </div>
  ));
};

export default ClientDetails;
