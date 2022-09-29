import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// hooks
import useQuiosco from "../hooks/useQuiosco";

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function ListDividers({categoria}) {

  // const { nombre, icono, id } = categoria;
  const { title, _id } = categoria;
  const { handleClickCategoria } = useQuiosco();
  
  return (
    <List sx={style}  component="nav" aria-label="mailbox folders">
      <ListItem button onClick={ ()=> {handleClickCategoria(_id)}  }> 
        <ListItemText primary={title} />
      </ListItem>
      <Divider /> {/* light */}
    </List>
  );
}
