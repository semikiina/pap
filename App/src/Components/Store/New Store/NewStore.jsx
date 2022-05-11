import { Container, Divider, Grid, Typography, Paper, TextField, Stack, Button, Box, Stepper, Step, StepLabel } from '@mui/material'
import React , {useState} from 'react'
import BasicInfos from './Store Steps/BasicInfos';
const steps = ['Basic Informations', 'Add a store picture', 'Review'];

const NewStore = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const StoreSteps = () =>{

    if(activeStep == 0) return <BasicInfos/>
    else if(activeStep == 1) return <Typography>ksdjflkjl</Typography>
  }

  return (
    <Container>
        <Typography padding={2} variant="h5">Create a new store</Typography>
        <Divider/>
        <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box>
            <Grid container spacing={2} marginTop={3} justifyContent={'center'}>
              <Grid item sx={12} md={6}>
                  <StoreSteps/>
              </Grid>
            </Grid>
            
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
      
    </Container>
  )
}

export default NewStore
