import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../../scenes/clientDetails/style.css'

const ClientDetails = () => {
  const [user, loading, error] = useAuthState(auth);
  const [client, setClient] = useState([]);
  // const clientsCollectionRef = collection(db, "clients");
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  // const navigate = useNavigate();
  const id = useParams();
  const clientId = id["id"];
  console.log(clientId);

  let docSnap;

  const docRef = doc(db, "clients", clientId)
  const getClient = async () => {
    docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    setClient(docSnap.data());
  }
  useEffect(() => {
    getClient();
  }, []);

  console.log(client);

  // const getClients = async () => {
  //   try {
  //     const data = await getDocs(clientsCollectionRef);
  //     setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   } catch (error) {
  //     // console.error(error);
  //   } finally {
  //     // Perform any necessary clean-up tasks here
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(clientsCollectionRef, (snapshot) => {
  //     const updatedClients = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setClients(updatedClients);
  //   });

  //   return unsubscribe; // This function will be called when the component unmounts to stop listening to the snapshot
  // }, []);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  let columns = [];
  let rows = [];

  return (
    user && (
    client && (
        <div className="basicDetails">
           <table className="black-text">
            <thead>
              <tr>
                <th className="personal-header">Personal</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="black-text">
              <tr>
                <td>Name</td>
                <td className="client-data">{client.firstName}</td> 
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td className="client-data">{client.dateOfBirth}</td>
              </tr>
              <tr>
                <td>Religion</td>
                <td className="client-data">{client.religion}</td>
              </tr>
              <tr>
                <td>Civil Status</td>
                <td className="client-data">{client.civilStatus}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td className="client-data">{client.weight}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td className="client-data">{client.height}</td>
              </tr>
              <tr>
                <td>Eye Color</td>
                <td className="client-data">{client.eyeColor}</td>
              </tr>
              <tr>
                <td>Hair Color</td>
                <td className="client-data">{client.hairColor }</td>
              </tr>
            </tbody>
          </table>
          <table className="black-text client-table">
            <thead>
              <tr>
                <th className="basic-details-header">Contact</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="black-text">
              <tr>
                <td>Email</td>
                <td className="client-data">{client.email}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td className="client-data">{client.phone}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td className="client-data">{client.streetAddress}</td>
              </tr>
              <tr>
                <td>City</td>
                <td className="client-data">{client.city}</td>
              </tr>
              <tr>
                <td>Zip Code</td>
                <td className="client-data">{client.zipCode}</td>
              </tr>
              <tr>
                <td>State/Region</td>
                <td className="client-data">{client.state}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td className="client-data">{client.country}</td>
              </tr>
            </tbody>
          </table>
          <table className="black-text">
            <thead>
              <tr>
                <th className="basic-details-header">Immigration</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="black-text">
              <tr>
                <td>Alien Number</td>
                <td className="client-data">{client.alienNumber}</td>
              </tr>
              <tr>
                <td>Visa Number</td>
                <td className="client-data">{client.visaNumber}</td>
              </tr>
              <tr>
                <td>I-94</td>
                <td className="client-data">{client.i94Number}</td>
              </tr>
              <tr>
                <td>Date of Arrival</td>
                <td className="client-data">{client.dateOfArrival}</td>
              </tr>
              <tr>
                <td>Immigration Status</td>
                <td className="client-data">{client.currentImmigrationStatus}</td>
              </tr>
              <tr>
                <td>USCIS Login</td>
                <td className="client-data">{client.uscisLogin}</td>
              </tr>
              <tr>
                <td>USCIS Password</td>
                <td className="client-data">{client.uscisPass}</td>
              </tr>
            </tbody>
          </table>
      </div>
      ) 
    ) 
  );
}

export default ClientDetails;