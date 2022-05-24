import { Container, Grid, Box, Paper, Button, FormControlLabel, Switch, Stepper, Typography, Step, StepLabel } from '@mui/material'
import api from '../../../Services/api';
import React, { useEffect, useState } from 'react'
import Step1 from './AddProduct/Step1';
import Step2 from './AddProduct/Step2';
import Step3 from './AddProduct/Step3';
import Step4 from './AddProduct/Step4';
import Step2Variantes from './AddProduct/Step2Variantes';

const steps = ['Basic Informations', 'Price and Variants','Combinations', 'Media Upload' , "Review"];

const AddProducts = () => {
    
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }


    const [isDisabledShipping, setIsDisabledShipping] = useState(false);
   
    const Shipping = (e)=>{
        if(!e.target.checked) setIsDisabledShipping(true)
        else setIsDisabledShipping(false)
    }

    const [images, setImages] = useState([]);
    const [htmlEditor, setHtmlEditor] = useState();

    const [newPr , setNewPr] = useState({});
    const [attributes, setAttributes] = useState([]);
    const [combos, setCombos] = useState([]);

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

    const ProductSteps = ()=>{
        if(activeStep == 0) return <Step1 categorys={categorys} setHtmlEditor={setHtmlEditor} setNewProd={setNewPr} setAttributes={setAttributes} handleNext={handleNext} />;
        else if(activeStep == 1) return <Step2Variantes setAttributes={setAttributes} handleNext={handleNext} handleBack={handleBack}  newPr={newPr} setNewPr={setNewPr} />;
        else if(activeStep == 2) return <Step2 newPr={newPr} attributes={attributes} handleNext={handleNext} setCombos={setCombos} handleBack={handleBack} />;
        else if(activeStep == 3) return <Step3 handleNext={handleNext} images={images} setImages={setImages} handleBack={handleBack} />;
        else if(activeStep == 4) return <Step4 handleBack={handleBack} onSubmit={onSubmit} />;
    }

    const onSubmit = data => {
        
        var shippingData;

        if(isDisabledShipping) shippingData = data.shipping

        else shippingData = 0;

        var formData = new FormData();

        var ins = images.length;

        for (var x = 0; x < ins; x++) {
            console.log(images[x])
            formData.append("image", images[x]);
        }
        for (var x = 0; x < ins; x++) {
            console.log(images[x])
            formData.append("voptions", JSON.stringify(newPr.variants[x]));
        }

        for (var x = 0; x < combos.length; x++) {

            formData.append("vprices[]", JSON.stringify(combos[x]));
        }
        
        formData.append("title", newPr.title)
        formData.append("stock", newPr.stock)
        formData.append("active", "true")
        formData.append("basePrice", newPr.basePrice)
        formData.append("category", newPr.category)
        formData.append("description", htmlEditor)
        formData.append("shipping", shippingData)
       

        api.post('product',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(data=>{
            console.log(data)
            //window.location.href="./storeProducts"
        })
        .catch(err=>{
            console.log(err) 
        })
    };


   
    return (
        <>
            <Container>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (index==1 || index==2) {
                            labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                            );
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
                    </React.Fragment>
                </Box>
            </Container>
        </>
    )
}

export default AddProducts
