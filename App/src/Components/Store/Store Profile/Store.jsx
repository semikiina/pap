import React, { useEffect, useState } from 'react'
import {Container, Paper, Typography, Box, Tab, Grid, CircularProgress, Button, Stack, Avatar,MenuItem,Select, TextField, InputAdornment} from '@mui/material'
import {Send, Settings} from '@mui/icons-material';
import {TabContext, TabList,TabPanel } from '@mui/lab/';
import StoreReviews from '../Store Profile/StoreReview/StoreReviews';
import StoreProduct from '../Store Profile/StoreProducts/StoreProduct';
import api from '../../../Services/api';
import { useParams } from 'react-router-dom';
import StoreEdit from '../Store Profile/StoreEdit/StoreEdit';
import SearchIcon from '@mui/icons-material/Search';
import  useAuth  from '../../Contexts/useAuth';


const Store = () => {
    const{ user,storeA} = useAuth();
    const [filter, setFilter] =useState('');
    const {id} = useParams();
    const [value, setValue] = useState('1');
    const [store, setStore] = useState({})
    const [products, setProducts] = useState([])
    const [storeName, setStoreName] = useState()
    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const handleChange = (event, newValue) => setValue(newValue);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const SortProducts = (e)=>{
        
        var newSort = [...products];
        //Low to High
        if(e.target.value==1){
            setProducts(store.product);
        }
        //Low to High
        if(e.target.value==2){
            
            newSort.sort(function(a, b) {
            return a.price - b.price;
            });
            setProducts(newSort);
        }
            
        //High to Low
        if(e.target.value==3){
            newSort.sort(function(a, b) {
            return b.price - a.price;
            });
            setProducts(newSort);
        }

        //New Arrivals
        if(e.target.value==4){
            newSort.sort(function(a, b) {
            return new Date(b.date_created) - new Date(a.date_created);
            });
            setProducts(newSort);
        }
            
    }


    
    const filteredProducts = products.filter((product)=> {

        return Object.keys(product).some(key =>
            product[key].toString().toLowerCase().includes(filter)
            )
    })

    useEffect(()=>{
        api.get('feed/store/'+id)
        .then(({data})=>{
            setStore(data)
            setStoreName(data.store_name)
            setAvatar(data.store_image)
            setProducts(data.product)
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
                                    {  <Avatar src={ store.store_image && "https://tagmeapi.herokuapp.com/"+avatar} sx={{width:200, height:200}} variant="square"></Avatar>}
                                   { (user._id == store.creator_id && storeA._id == id ) &&  <Button  variant="outlined" color="secondary" onClick={handleOpen} >Edit Store</Button> }
                                    <Button variant="contained" href ={ `mailto:${store.store_email}`} fullWidth> <Typography paddingRight={1}>Send Email</Typography> <Send fontSize='small'/></Button>
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
                                <TabPanel value="1">
                                    <Stack direction="row" alignItems={'center'} spacing={2} justifyContent="space-between">
                                        <TextField  
                                            placeholder='Search...'
                                            InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                <SearchIcon />
                                                </InputAdornment>
                                            ),
                                            }}
                                            value={filter}
                                            onChange={(ev) => { setFilter(ev.target.value.toString().toLowerCase())}}
                                            >

                                        </TextField>
                                        <Box>
                                            <Stack direction="row" alignItems={'center'} spacing={2}>
                                                <Typography>Order by</Typography>
                                                <Select
                                                    defaultValue={1}
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    sx={{width:200}}
                                                    onChange={SortProducts}
                                                >
                                                    <MenuItem value={1}>Recommended</MenuItem>
                                                    <MenuItem value={2}>Price Low to High</MenuItem>
                                                    <MenuItem value={3}>Price High to Low</MenuItem>
                                                    <MenuItem value={4}>New Arrivals</MenuItem>
                                                </Select>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                    {
                                        products.length ? <StoreProduct product={filteredProducts}/> : <Typography variant="h6" textAlign={'center'} marginTop={5}>This store doesn't have any products yet.</Typography>
                                    }
                                    
                                </TabPanel>
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
