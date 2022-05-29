import { Container, Divider, Grid, Typography, Paper, Stack, Box, Stepper, Step, StepLabel, CircularProgress, Backdrop } from '@mui/material'
import React , {useState} from 'react'
import BasicInfos from './Store Steps/BasicInfos';
import StorePicture from './Store Steps/StorePicture';

const steps = ['Basic Informations', 'Add a store picture'];


const NewStore = () => {


    const [newStore, setNewStore] = useState({});

    const [loading, setLoading] = useState(false);

    const [activeStep, setActiveStep] = useState(0);

    const [skipped, setSkipped] = useState(new Set());


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

        if(activeStep == 1) window.location.href="../ConfirmStore/"+newStore.store_email

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

   
  const StoreSteps = () =>{
    if(activeStep == 0) return <BasicInfos handleNext={handleNext} newStore={newStore} setNewStore={setNewStore}/>
    else if(activeStep == 1) return <StorePicture  handleNext={handleNext} handleBack={handleBack} newStore={newStore} setLoading={setLoading} />
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
            <React.Fragment>
            <Box>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                    >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Grid container spacing={2} marginTop={3} justifyContent={'center'}>
                <Grid item sm={12} md={6}>
                    <Paper elevation={6}>
                        <Stack padding={3} spacing={2} >
                        <StoreSteps/>
                        </Stack>
                    </Paper>
                </Grid>
                </Grid>
            </Box>
            </React.Fragment>
        </Box>
    </Container>
  )
}

export default NewStore
