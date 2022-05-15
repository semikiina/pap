import React, { useState } from 'react'
import {Paper, Typography, Stepper, Step, CircularProgress, StepLabel, Container,Box,Stack  } from '@mui/material';
import AdressForm from './CheckoutForm/AdressForm';
import PaymentForm from './CheckoutForm/PaymentForm';

const steps=['Shipping Adress', 'Payment details']


const Checkout = ({Cart,userId}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
  
    const Confirmation = () =>(
        <div>
            Confirmation
        </div>
    )

    const nextStep =() => setActiveStep((prev) => prev + 1 );
    const backStep =() => setActiveStep((prev) => prev - 1 );
    
    const next = (data) =>{
       setShippingData(data)
       nextStep();
    }



    const Form = () => activeStep == 0 
        ? <AdressForm next={next}/>
        : <PaymentForm shippingData ={shippingData} cart={Cart} userId={userId} backStep={backStep}/>

    return (
        <Container>
            <Paper >
                <Typography paddingTop={4} variant="h3" align="center">Checkout</Typography>
                    <Box  padding={4}>
                            <Stepper activeStep={activeStep} >
                                {steps.map((label, index) => {
                                    return (
                                    <Step key={label} >
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                    );
                                })}
                            </Stepper>
                        {activeStep == steps.length ? <Confirmation/> : <Form/>}
                    </Box>
                </Paper>
        </Container>
      
    );
  
}

export default Checkout
