import { Container, Grid, Box, Paper, Button, FormControlLabel, Switch, Stepper, Typography, Step, StepLabel } from '@mui/material'
import api from '../../../Services/api';
import React, { useEffect, useState } from 'react'
import ColAddProduct from './AddProduct/ColAddProduct';
import { useForm } from "react-hook-form";
import Step1 from './AddProduct/Step1';

const steps = ['Basic Informations', 'Details', 'Media Upload' , "Review"];

const AddProducts = () => {
    
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


    // const {  handleSubmit, register } = useForm();
    
    // const [images, setImages] = useState([]);
    
    // const [isDisabledShipping, setIsDisabledShipping] = useState(false);
   
    // const [colorValue, setColorValue] = useState([]);
    // const [sizeValue, setSizeValue] = useState([]);


    // const Shipping = (e)=>{
    //     if(!e.target.checked) setIsDisabledShipping(true)
    //     else setIsDisabledShipping(false)
    // }

    const [htmlEditor, setHtmlEditor] = useState();

    const [categorys, setCategorys] = useState([])

    useEffect(()=>{
        api.get('product/categorys')
        .then(cats=>{
            setCategorys(cats.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const onSubmit = data => {

        console.log(data)
        
        // var shippingData;

        // if(isDisabledShipping) shippingData = data.shipping

        // else shippingData = 0;

        // var formData = new FormData();

        // var ins = images.length;

        // for (var x = 0; x < ins; x++) {

        //     formData.append("image", images[x]);
        // }


        // for (var x = 0; x < colorValue.length; x++) {

        //     formData.append("color", colorValue[x])
        // }

        // for (var x = 0; x < sizeValue.length; x++) {

        //     formData.append("size", sizeValue[x])
        // }
        
        // formData.append("title", data.title)
        // formData.append("stock", data.stock)
        // formData.append("active", data.active)
        // formData.append("price", data.price)
        // formData.append("category", data.category)
        // formData.append("description", htmlEditor)
        // formData.append("shipping", shippingData)
       

        // api.post('product',formData,{
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        // .then(data=>{
        //     window.location.href="./storeProducts"
        // })
        // .catch(err=>{
        //     console.log(err) 
        // })
    };


    const[newProd, setNewProd] = useState();
    const [prVariants, setPrVariants] = useState();
    

    const ProductSteps = ()=>{
        if(activeStep == 0) return <Step1 categorys={categorys} setHtmlEditor={setHtmlEditor} setNewProd={setNewProd} setPrVariants={setPrVariants} />;
    }
   
    return (
        <>
            <Container>
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
                        <Box marginTop={4}>
                            <ProductSteps />
                        </Box>




                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {
                                isStepOptional(activeStep) && (<Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}> Skip</Button>)
                            }

                            {activeStep === steps.length - 1 
                                ?   <Button>Save Changes</Button> 
                                :   <Button onClick={handleNext}>Next</Button>
                            }
                            
                        </Box>
                    </React.Fragment>
                </Box>
                {/* <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8} >
                            <ColAddProduct 
                            register={register} 
                            setImages={setImages} 
                            setHtmlEditor={setHtmlEditor} 
                            isDisabledShipping={isDisabledShipping} 
                            Shipping={Shipping} 
                            categorys={categorys}
                            setColorValue={setColorValue}
                            colorValue={colorValue}
                            setSizeValue={setSizeValue}
                            sizeValue={sizeValue}
                            ></ColAddProduct>
                        </Grid>
                        <Grid item xs={12} md={4} >
                            <Box marginBottom={4}>
                                <Paper >
                                    <Box padding={2}>
                                        <Button padding={2} variant="contained" fullWidth type="submit">Save Changes</Button>
                                    </Box>
                                    <Box padding={2}>
                                        <FormControlLabel control={<Switch defaultChecked {...register('active')}/>} label="Active Product" />
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </form> */}
            </Container>
        </>
    )
}

export default AddProducts
