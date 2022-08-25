import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import useMediaQuery from "@mui/material/useMediaQuery";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://www.clarin.com/img/2021/06/17/LC25eDtCT_1256x620__1.jpg',
  },
  {
    label: 'Bird',
    imgPath:
      'https://www.clarin.com/img/2022/03/02/messi-eligio-los-ingredientes-para___cs6-sN_P0_1256x620__1.jpg',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://okdiario.com/img/2021/05/28/hamburguesa-gourmet-655x368.jpg',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://www.7diasdesabor.com/wp-content/uploads/2021/09/1076fd5d300697841e881a78254d04963a2.jpg',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const matches = useMediaQuery('(max-width:600px)');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          // bgcolor: 'background.default',
          backgroundColor: 'transparent',
          marginTop: '7px'
        }}
      >
        {/* <Typography>{images[activeStep].label}</Typography> */}
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={ !matches ? { borderRadius: 36 , width: '60pc'} :  { borderRadius: 36 } }
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                style={{borderRadius: '18px', display: 'initial'}}
                sx={
                  matches ? {
                    height: 300,
                  display: 'block',
                  // maxWidth: '10%',
                  overflow: 'hidden',
                  width: '100%',
                  } :
                  {
                  height: 455,
                  display: 'block',
                  // maxWidth: '10%',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            style={{ marginTop: -300 }}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button style={{ marginTop: -300 }} size="medium" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
