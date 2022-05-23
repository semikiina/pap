import { Paper, Stack, Typography, TextField, Button, Grid, Divider, InputAdornment, Box } from '@mui/material'
import React from 'react'
import { useForm} from 'react-hook-form';

const Step2 = ({attributes, newPr, setCombos, handleNext, handleBack}) => {

    const { register, handleSubmit} = useForm();  

    const onSubmit2 = (data) =>{

        setCombos(data.combs)
        console.log(data)
        handleNext();
    }

    console.log(attributes)
    return (
        <Paper>
            <Typography padding={2} variant="h6">Combinations Prices and Stock</Typography>
            <Divider/> 
            <form onSubmit={handleSubmit(onSubmit2)}>
            {
                attributes?.map((attid,index)=>{
                    return (
                        <Grid  container spacing={3} marginTop={1} padding={2} key={index}>
                            <input type="hidden" value={attid} {...register(`combs[${index}].name`)}></input>
                            <Grid item sm={12} md={2} alignContent={'center'}><Typography textAlign={'end'}>{attid.replace( '?', ' / ') +" :" }</Typography></Grid>
                            <Grid item sm={12} md={5}><TextField size="small" fullWidth label="Price" defaultValue={newPr?.price} {...register(`combs[${index}].price`)} InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment>, step:' 0.01'}} /></Grid>
                            <Grid item sm={12} md={5}><TextField size="small" fullWidth label="Stock" defaultValue={1} {...register(`combs[${index}].stock`)}/></Grid>
                        </Grid>
                    )
                }) 
            }
                <Box padding={2}>
                    <Stack direction="row" justifyContent={'flex-end'}>
                        <Button onClick={handleBack}>Back</Button>
                        <Button type="submit">Next</Button>
                    </Stack>
                </Box>
            </form>
        </Paper>
    )
}

export default Step2
