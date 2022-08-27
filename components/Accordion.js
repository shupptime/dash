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
  const { categoriaActual } = useQuiosco();

  return (
    <div style ={ matches ? { marginTop: '5px', width: '110%' } : { marginTop: '5px' }}>
      <Accordion>
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

        {/* <Card/>
        <Card/> */}

          {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
        </AccordionDetails>
      </Accordion>
      {/*<Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </div>
  );
}
