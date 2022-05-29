import { Grid, Typography , Stack, Button} from '@mui/material';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import NewAddress from './Address Form/NewAddress';
import ListOfAddresses from './Address Form/ListOfAddresses';
import useAuth from '../../Contexts/useAuth';
import api from '../../../Services/api';

const AdressForm = ({next}) => {

    const {  handleSubmit, register } = useForm();
    const onSubmit = data => next(data);
    const { user } = useAuth();

    const [newAddress, setNewAddress] = useState(true);
    const [exAddress, setExAddress] = useState('');
    
    const handleClick = () =>{
        api.get('order/stock')
        .then(data=>{
            console.log(data)
        })
        next(user.addresses.filter(o => o._id === exAddress)[0])
    }

    return (
        <>
            <Typography variant="h5" marginTop={4} marginBottom={3}>Shipping Address</Typography>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Typography variant="subtitle1" paddingLeft={2}><b>My addresses</b></Typography>
                    <ListOfAddresses setNewAddress={setNewAddress} setExAddress={setExAddress} />
                </Grid>
            </Grid>
            {
                newAddress 
                ? <NewAddress handleSubmit={handleSubmit} register={register} onSubmit={onSubmit}  ></NewAddress>
                : <Button variant='contained' color='secondary' fullWidth onClick={handleClick}>Continue</Button>
            }
            
       
        </>
    )
}

export default AdressForm
