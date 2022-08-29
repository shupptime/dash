import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//component
import Card from '../components/Card';

//hook
import useMediaQuery from "@mui/material/useMediaQuery"; //query
import useQuiosco from "../hooks/useQuiosco";

export default function SimpleAccordion({ categoria }) {
  const matches = useMediaQuery('(max-width:600px)');
  const { nombre, icono, id } = categoria;
  const { categoriaActual, handleClickCategoria } = useQuiosco();

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style ={ matches ? { marginTop: '5px' } : { marginTop: '5px', width: '80%' }}>
      <Accordion  
        // expanded={expanded === `${nombre}` } 
        // onChange={handleChange(nombre)}
        onChange={() => handleClickCategoria(id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{nombre}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          {categoriaActual?.productos?.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))}


        </AccordionDetails>
      </Accordion>
  
    </div>
  );
}
