import * as React from "react";
import { useTheme } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import  {tokens}  from "../theme";


const ClientList = ({ props }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const navigate = useNavigate();

  console.log(props);
  let members;
  if (props) {
    members = props.map((member) => member);
  }
  console.log(members);

  // let q;

  // for (let i = 0; i < members.size; i++) {
  //   q = query(collection(db, "clients"), where(doc.id == members[i]));
  // }

  // const getClients = async () => {
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // };
  // useEffect(() => {
  //   getClients();
  // }, []);
  let imageSources = [
    "https://i.pinimg.com/originals/f2/a7/42/f2a742ec86bba7efe2b7f048d80d8fd5.jpg",
    "https://heroichollywood.com/wp-content/uploads/2018/10/Avengers_Infinity_War_Robert_Downey_Jr_Marvel_Studios.jpg",
    "https://i.ytimg.com/vi/MAfIvBgChjQ/maxresdefault.jpg",
    "https://i.pinimg.com/736x/5b/c3/0d/5bc30dcbfd038099c511a10d9f276f64.jpg"
  ]

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 500, bgcolor: colors.primary[400] }}
    >
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={value} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={imageSources[value]}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ClientList;
