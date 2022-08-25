import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

// component
import CardMedia from '@mui/material/CardMedia';

//hook
import useMediaQuery from "@mui/material/useMediaQuery";
import { fontSize } from '@mui/system';

function MainFeaturedPost(props) {
  const { post } = props;
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: 'red',
      }}
    >
      {/* Increase the priority of the hero background image */}
      
     {/* <CardMedia
        component="img"
        height="140"
        image="https://s3-eu-central-1.amazonaws.com/www.burgerking.com.ar.v2/wp-media-folder-burger-king-argentina//home/ubuntu/preview/menu-app/frontend/apps/marketing-website-wordpress-app/web/app/uploads/sites/5/ExtraBurger-XL.png"
        alt="green iguana"
      />  */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
          display: 'flex', flexDirection: 'column'

        }}
      />
    
      <Grid container>
      
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom sx = { matches ? { fontSize: "2rem"} : ''}>
              Gran burger
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
             ver precio
            </Typography>
            <Link variant="subtitle1" href="#">
              aca link ?
            </Link>
          </Box>
        </Grid>
        <Grid item md={6}>
        <img  style={ !matches ? { display: 'block', marginLeft: "100px", width: "350px", height:"250px" } : {display: 'flex',
    marginLeft: "200px",
    width: "125px",
    height: "133px",
    marginTop: '-140px'} } src='https://s3-eu-central-1.amazonaws.com/www.burgerking.com.ar.v2/wp-media-folder-burger-king-argentina//home/ubuntu/preview/menu-app/frontend/apps/marketing-website-wordpress-app/web/app/uploads/sites/5/ExtraBurger-XL.png' alt="img" /> 
        </Grid>
        
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;