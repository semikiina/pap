import React, { useEffect, useState } from 'react'
import {Container, Paper, Typography, Box, Tab, Grid, CircularProgress, Button, Stack} from '@mui/material'
import {Send, Settings} from '@mui/icons-material';
import {TabContext, TabList,TabPanel } from '@mui/lab/';
import StoreReviews from './StoreReview/StoreReviews';
import StoreProduct from './StoreProducts/StoreProduct';
import api from '../../Services/api';
import { useParams } from 'react-router-dom';


const Store = () => {

    const {id} = useParams();
    const [value, setValue] = React.useState('1');
    const [store, setStore] = useState({})

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(()=>{
        api.get('store/'+id)
        .then(({data})=>{
            setStore(data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    
    if (!store) return <CircularProgress/>;
    return (
        <>
            <Container>
                <Grid container spacing={3}>
                    <Grid item md={4} lg={3}>
                        <Box>
                            <Paper>
                                <Stack spacing={1}>
                                    <Typography paddingTop={2} align={'center'}>{store.store_name}</Typography>
                                    <Box  padding={1} >
                                        <img src="https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?w=2000" alt="profile" width="200" height="200"></img>
                                    </Box>
                                    <Stack direction="row" spacing={1}><Button fullWidth variant="outlined" color="secondary">Edit Store</Button><Button><Settings  color="gray"/></Button></Stack>
                                    <Button variant="contained" href = "mailto: abc@example.com" > <Typography paddingRight={1}>Send Email</Typography> <Send fontSize='small'/></Button>
                                </Stack>
                                
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item md={8} lg={9}>
                        <Paper sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="profile tabs">
                                    <Tab label="Products" value="1" fullWidth/>
                                    <Tab label="Reviews" value="2" />
                                </TabList>
                                </Box>
                                <TabPanel value="1"><StoreProduct product={store.product}/></TabPanel>
                                <TabPanel value="2"><StoreReviews/> </TabPanel>
                            </TabContext>
                        </Paper>
                    </Grid>
                </Grid>
            </Container> 
        </>
    )
}

export default Store
