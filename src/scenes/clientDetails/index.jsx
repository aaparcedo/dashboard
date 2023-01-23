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
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  // const navigate = useNavigate();
  const id = useParams();
  const clientId = id["id"];
  console.log(clientId);

  const NavBar=[
    {name: "Personal", dis:"translate-x-0"},
    {name: "Contact", dis:"translate-x-16"},
    {name: "Immigration", dis:"translate-x-32"}
  ]

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
           <table className="black-text table">
            <thead>
              <tr>
                <th className="personal-header">Personal</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="black-text">
              <tr>
                <td>Name</td>
                <td style={{color: '#71797E', textAlign: 'center' }} className="client-data">{client.firstName}</td> 
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td style={{color: '#71797E'}} className="client-data">{client.dateOfBirth}</td>
              </tr>
              <tr>
                <td>Religion</td>
                <td style={{color: '#71797E'}} className="client-data">{client.religion}</td>
              </tr>
              <tr>
                <td>Civil Status</td>
                <td style={{color: '#71797E'}} className="client-data">{client.civilStatus}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td style={{color: '#71797E'}} className="client-data">{client.weight}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td style={{color: '#71797E'}} className="client-data">{client.height}</td>
              </tr>
              <tr>
                <td>Eye Color</td>
                <td style={{color: '#71797E'}} className="client-data">{client.eyeColor}</td>
              </tr>
              <tr>
                <td>Hair Color</td>
                <td style={{color: '#71797E'}} className="client-data">{client.hairColor }</td>
              </tr>
              <tr>
                <button className="bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold 
                hover:text-white py-2 px-5 my-2 rounded-lg border border-indigo-500 hover:border-transparent"> Add Row </button>
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
                <td style={{color: '#71797E'}} className="client-data">{client.email}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td style={{color: '#71797E'}} className="client-data">{client.phone}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td style={{color: '#71797E'}} className="client-data">{client.streetAddress}</td>
              </tr>
              <tr>
                <td>City</td>
                <td style={{color: '#71797E'}} className="client-data">{client.city}</td>
              </tr>
              <tr>
                <td>Zip Code</td>
                <td style={{color: '#71797E'}} className="client-data">{client.zipCode}</td>
              </tr>
              <tr>
                <td>State/Region</td>
                <td style={{color: '#71797E'}} className="client-data">{client.state}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td style={{color: '#71797E'}} className="client-data">{client.country}</td>
              </tr>
              <tr>
                <button className="bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold 
                hover:text-white py-2 px-5 my-2 rounded-lg border border-indigo-500 hover:border-transparent"> Add Row </button>
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
                <td style={{color: '#71797E'}} className="client-data">{client.alienNumber}</td>
              </tr>
              <tr>
                <td>Visa Number</td>
                <td style={{color: '#71797E'}} className="client-data">{client.visaNumber}</td>
              </tr>
              <tr>
                <td>I-94</td>
                <td style={{color: '#71797E'}} className="client-data">{client.i94Number}</td>
              </tr>
              <tr>
                <td>Date of Arrival</td>
                <td style={{color: '#71797E'}} className="client-data">{client.dateOfArrival}</td>
              </tr>
              <tr>
                <td>Immigration Status</td>
                <td style={{color: '#71797E'}} className="client-data">{client.currentImmigrationStatus}</td>
              </tr>
              <tr>
                <td>Status on Arrival</td>
                <td style={{color: '#71797E'}} className="client-data">{client.immigrationStatusOnArrival}</td>
              </tr>
              <tr>
                <td>USCIS Login</td>
                <td style={{color: '#71797E'}} className="client-data">{client.uscisLogin}</td>
              </tr>
              <tr>
                <td>USCIS Password</td>
                <td style={{color: '#71797E'}} className="client-data">{client.uscisPass}</td>
              </tr>
              <tr>
                <button className="bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold 
               hover:text-white py-2 px-5 my-2 rounded-lg border border-indigo-500 hover:border-transparent"> Add Row </button>
              </tr>
            </tbody>
          </table>
      </div>
      ) 
    ) 
  );
}

export default ClientDetails;