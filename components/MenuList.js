import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router'

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function ListDividers({categoria}) {

  const { nombre, icono, id } = categoria;
  const router = useRouter()

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button onClick={ ()=> router.push('/ProductsList') }>
        <ListItemText primary={nombre} />
      </ListItem>
      <Divider /> {/* light */}
    </List>
  );
}
