import React, { useState } from 'react'
import {Paper, Typography, Stepper, Step, CircularProgress, StepLabel, Container,Box,Stack, Tooltip  } from '@mui/material';
import AdressForm from './CheckoutForm/AdressForm';
import PaymentForm from './CheckoutForm/PaymentForm';
import { ArrowBack } from '@mui/icons-material';



const steps=['Shipping Adress', 'Payment details']


const Checkout = ({Cart, setUpdateNots}) => {

    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
  
    const nextStep =() => setActiveStep((prev) => prev + 1 );
    
    const backStep =() => {
        if(activeStep-1 <0) window.location.href="../cart"

        else setActiveStep((prev) => prev - 1 );

    }
    
    const next = (data) =>{
       setShippingData(data)
       nextStep();
    }

    const Form = () => activeStep == 0 
        ? <AdressForm next={next}/>
        : <PaymentForm shippingData ={shippingData} cart={Cart}  backStep={backStep} setUpdateNots={setUpdateNots}/>

    return (
        <Container>
            <Paper >
                <Typography paddingTop={4} variant="h4" align="center">Checkout</Typography>
               
                    <Box  padding={4}>
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <Tooltip title="Go Back">
                                <ArrowBack onClick={backStep}/>
                            </Tooltip>
                            <Box>
                                <Stepper activeStep={activeStep} >
                                    {steps.map((label, index) => {
                                        return (
                                        <Step key={label} >
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                        );
                                    })}
                                </Stepper>
                            </Box>
                        </Stack>
                    </Box>
                    <Box paddingX={4} paddingBottom={4}>
                        <Form/>
                    </Box>
                </Paper>
        </Container>
      
    );
  
}

export default Checkout
