import React, { useEffect, useState } from 'react'
import {Container, Paper, Typography, Box, Tab, Grid, CircularProgress, Button, Stack, Avatar} from '@mui/material'
import {Send, Settings} from '@mui/icons-material';
import {TabContext, TabList,TabPanel } from '@mui/lab/';
import StoreReviews from '../Store Profile/StoreReview/StoreReviews';
import StoreProduct from '../Store Profile/StoreProducts/StoreProduct';
import api from '../../../Services/api';
import { useParams } from 'react-router-dom';
import StoreEdit from '../Store Profile/StoreEdit/StoreEdit';


const Store = () => {

    const {id} = useParams();
    const [value, setValue] = useState('1');
    const [store, setStore] = useState({})
    const [storeName, setStoreName] = useState()
    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        api.get('store/'+id)
        .then(({data})=>{
            setStore(data)
            setStoreName(data.store_name)
            setAvatar(data.store_image)
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
                                <Stack spacing={1} justifyContent="center" alignItems={'center'}>
                                    <Typography paddingTop={2} align={'center'}>{storeName}</Typography>
                                    {store.store_image &&  <Avatar src={"http://localhost:8090/"+avatar} sx={{width:200, height:200}} variant="square"></Avatar>}
                                    <Stack direction="row" spacing={1} alignItems={'center'} >
                                        <Button  variant="outlined" color="secondary" onClick={handleOpen} >Edit Store</Button>
                                        <Settings  color="gray"/>
                                    </Stack>
                                    <Button variant="contained" href = "mailto: abc@example.com" fullWidth> <Typography paddingRight={1}>Send Email</Typography> <Send fontSize='small'/></Button>
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
            <StoreEdit open={open} handleClose={handleClose} store={store} setStore={setStore} setAvatar={setAvatar} setStoreName={setStoreName}></StoreEdit>
        </>
    )
}

export default Store
