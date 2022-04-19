import { Grid, Typography , TextField, Button} from '@mui/material';
import React from 'react'
import { useForm, register } from "react-hook-form";

const AdressForm = ({next}) => {
  const {  handleSubmit, register } = useForm();
  const onSubmit = data => next(data);

  return (
    <>
    <Typography variant="h5" marginTop={4} marginBottom={3}>Shipping Address</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} marginBottom={3}>
                  <TextField  label="First Name" {...register("first_name")} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={6} marginBottom={3}>
                  <TextField  label="Last Name" {...register("last_name")} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={6} marginBottom={3}>
                  <TextField  label="Email" {...register("email")} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={6} marginBottom={3}>
                  <TextField  label="Phone" {...register("phone")} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={6} marginBottom={3}>
                  <TextField  label="Country" {...register("country")} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={6} marginBottom={3}>
                  <TextField  label="State" {...register("state")} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={6} marginBottom={3}>
                  <TextField  label="Zip Code" {...register("zip_code")} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={6} marginBottom={3}>
                  <TextField  label="Province" {...register("province")} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12}  marginBottom={3}>
                  <TextField  label="Adress 1" {...register("address_1")} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} marginBottom={3}>
                  <TextField  label="Adress 2" {...register("address_2")} fullWidth ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} marginBottom={3}>
                  <Button type='submit' variant='contained' color='secondary' fullWidth>Submit</Button>
                </Grid>
                
            </Grid>
        </form>
     
    </>
  )
}

export default AdressForm
