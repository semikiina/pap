import { Container, Divider, Grid, Typography, Paper, TextField, Stack, Button, Box, Stepper, Step, StepLabel, CircularProgress, Backdrop } from '@mui/material'
import React , {useState} from 'react'
import BasicInfos from './Store Steps/BasicInfos';
import StorePicture from './Store Steps/StorePicture';
import api from '../../../Services/api'
import ConfirmStore from './Store Steps/ConfirmStore';

const steps = ['Basic Informations', 'Add a store picture', 'Confirm'];


const NewStore = () => {

    const [storeName, setStoreName] = useState('');
    const [storeEmail, setStoreEmail] = useState('');
    const [code, setCode] = useState('');

    const [loading, setLoading] = useState(false);
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

   


    const confirmStore = () =>{
        api.post('store/confirmAccount/'+storeEmail,{
            code: code
        })
        .then(data =>{
            window.location.href="./store/"+data.data
        })
        .catch(err=>{
            console.log(err)
        })

    }

  const StoreSteps = () =>{
    if(activeStep == 0) return <BasicInfos handleNext={handleNext} storeName={storeName} setStoreName={setStoreName} storeEmail={storeEmail} setStoreEmail={setStoreEmail}/>
    else if(activeStep == 1) return <StorePicture  handleNext={handleNext} handleBack={handleBack} handleSkip={handleSkip} storeName={storeName} storeEmail={storeEmail} setLoading={setLoading}/>
    else if(activeStep == 2) return <ConfirmStore storeEmail={storeEmail} code={code} setCode={setCode} handleBack={handleBack} confirmStore={confirmStore}/>
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
