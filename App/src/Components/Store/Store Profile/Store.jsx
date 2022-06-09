import React, { useEffect, useState } from 'react'
import {Container, Paper, Typography, Box, Tab, Grid, CircularProgress, Button, Stack, Avatar,MenuItem,Select, TextField, InputAdornment, Chip} from '@mui/material'
import {Lock, LockOutlined, RemoveRedEye, Send, Settings} from '@mui/icons-material';
import {TabContext, TabList,TabPanel } from '@mui/lab/';
import StoreReviews from '../Store Profile/StoreReview/StoreReviews';
import StoreProduct from '../Store Profile/StoreProducts/StoreProduct';
import api from '../../../Services/api';
import { useParams } from 'react-router-dom';
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
            console.log(data)
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

    else if(!store.active && !(store.collaborators?.some(e => e.user_id == user._id) && storeA._id == store._id)) return (
        <Grid container alignItems={'center'} justifyContent={'center'} >
            <Box padding={4}>
                <Stack direction="row" alignItems={'center'} marginBottom={2}>
                    <LockOutlined sx={{width:100, height :100}} color="secondary" />
                    <Box>
                        <Typography variant="h5">This store is currently private!</Typography>
                        <Typography >Try to visit it later. If you own this store,</Typography>
                        <Typography >make sure that you've logged with the right account.</Typography>
                    </Box>
                </Stack>
                <Button fullWidth variant="outlined" href="../feed/stores" color="secondary" > See other stores</Button>
            </Box>
        </Grid>
        
    )


    else return (
        <>
            <Container >
                <Grid container spacing={3}>
                    <Grid xs={12} item md={4} lg={3} >
                        <Box>
                            <Paper>
                                <Stack spacing={1} justifyContent="center" alignItems={'center'} paddingTop={2}>
                                    {
                                        (store.collaborators?.some(e => e.user_id == user._id) && storeA._id == store._id) && <Chip  variant="outlined" icon={store.active ? <RemoveRedEye/> :  <Lock />}  label={store.active ? "Public Store" : "Private Store"} color={store.active ? "success" : "secondary"} />
                                    }
                                    <Typography paddingTop={2} align={'center'}>{storeName}</Typography>
                                    {  <Avatar src={ store.store_image && "http://localhost:8090/"+avatar} sx={{width:200, height:200}} variant="square"></Avatar>}
                                    
                                    <Typography>{`${store.orders.length} orders`}</Typography>
                                    
                                    <Button variant="contained" href ={ `mailto:${store.store_email}`} fullWidth> <Typography paddingRight={1}>Send Email</Typography> <Send fontSize='small'/></Button>
                                </Stack>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item  xs={12} md={8} lg={9}>
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
                                <TabPanel value="2"><StoreReviews storeid={id} /> </TabPanel>
                            </TabContext>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Store
