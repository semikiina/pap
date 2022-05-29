import React, { useState } from 'react'
import { Typography, TextField, Button, Paper, Grid, Stack, Box} from '@mui/material'
import api from '../../../../Services/api';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';


const ConfirmStore = () => {

    const {  handleSubmit, register} = useForm();
    const {email} = useParams();
    const [falseCode, setFalseCode] =useState(false)

    const confirmStore = (data) =>{
        setFalseCode(false)
        api.post('store/confirmAccount/'+email,{
            code: data.code
        })
        .then(data =>{
            window.location.href="../store/"+data.data.id
        })
        .catch(err=>{
            setFalseCode(true)
            console.log(err)
        })

    }

    return (
        <form onSubmit={handleSubmit(confirmStore)}>
            <Stack padding={4} alignItems={'center'}>
                    <Paper  sx={{maxWidth: 600}}>
                        <Stack padding={4} spacing={2}>
                            <Typography textAlign={'center'} variant="h6">Please insert the code that we've just sent to</Typography>
                            <Typography textAlign={'center'} variant="subtitle2">{email}</Typography>
                            <Box>
                                <TextField label="Code" fullWidth {...register('code')}></TextField>
                                <Typography variant="caption" color="error">{falseCode && 'Invalid Code.'}</Typography>
                            </Box>
                            <Button variant="contained" color="success" type="submit" fullWidth> Confirm</Button>
                        </Stack>
                </Paper>
            </Stack>
            
           
        </form> 
    )
}

export default ConfirmStore
