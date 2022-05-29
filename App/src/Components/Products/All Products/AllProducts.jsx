import { Filter, FilterList, Search } from '@mui/icons-material';
import {TabContext, TabList,TabPanel } from '@mui/lab/';
import { Container, IconButton, InputBase, Paper, Box, Divider, Tooltip, Grid, Collapse, Tab, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../../Services/api';
import Carousselitem from '../Components/Carousselitem';
import CarousselitemStores from '../New Stores/Components/CarousselitemStores';
import FeedProduct from './All Product Components/FeedProduct';
import Filters from './All Product Components/Filters';

const AllProducts = ({newFav, onAddToCart}) => {

    
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const {opt} = useParams();
    const [order, setOrder] = useState(1);
    
    const [search , setSearch] = useState("");

    const SortProducts = (e)=>{
        
        var newSort = [...products];
        //Low to High
        if(e.target.value==1){
            setOrder(1);
            newSort.sort(function(a, b) {
                return new Date(a.date_created) - new Date(b.date_created);
            });
            setProducts(newSort);
        }
        //Low to High
        if(e.target.value==2){
            setOrder(2);
            newSort.sort(function(a, b) {
            return a.price - b.price;
            });
            setProducts(newSort);
        }
            
        //High to Low
        if(e.target.value==3){
            setOrder(3);
            newSort.sort(function(a, b) {
            return b.price - a.price;
            });
            setProducts(newSort);
        }

        //New Arrivals
        if(e.target.value==4){
            setOrder(4);
            newSort.sort(function(a, b) {
            return new Date(b.date_created) - new Date(a.date_created);
            });
            setProducts(newSort);
        }
            
    }

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const [tabIndex, setTabIndex] = useState(opt);

    const handleChangeTab = (event, newValue) => {
        setTabIndex(newValue);
      };
    

    useEffect(()=>{

        api.get('feed')
        .then( data =>{
            setProducts(data.data)
        })
        .catch(err=>{
            console.log(err)
        })

        api.get('feed/stores')
        .then( data =>{
            setStores(data.data)
        })
        .catch(err=>{
            console.log(err)
        })

        api.get('product/categorys')
        .then( data =>{
            setCategorys(data.data)
        })
        .catch(err=>{
            console.log(err)
        })

    },[newFav])

    return (
        <Container>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%'}}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search here..."
                    value={search}
                    onChange={(ev) => { setSearch(ev.target.value)}}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <Search />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical"/>
                <IconButton onClick={handleChange}>
                    <Tooltip title="Filters">
                        <FilterList/>
                    </Tooltip>
                </IconButton>
            </Paper>
            <Box>
                <Collapse in={checked}>
                    <Filters categorys={categorys} order={order}/>
                </Collapse>
            </Box>
            <TabContext value={tabIndex}>
                <TabList  onChange={handleChangeTab}>
                    <Tab label="Products" value="products" />
                    <Tab label="Stores" value="stores"/>
                </TabList>
                <TabPanel value="products">
                    <Grid container>
                        {
                            products?.filter((item => {
                                if(search == "") return item;
                                else if ( item.title.toLowerCase().includes(search.toLocaleLowerCase()) || item.category.toLowerCase().includes(search.toLocaleLowerCase())){
                                    return item;
                                }
                            })).map((product)=>{
                                return( 
                                    <Grid key={product._id}  item sm={12} md={3}>
                                        <Carousselitem product={product} newFav={newFav} onAddToCart={onAddToCart} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </TabPanel>
                <TabPanel value="stores">
                    <Grid container>
                        {
                            stores?.filter((item => {
                                if(search == "") return item;
                                else if ( item.store_name.toLowerCase().includes(search.toLocaleLowerCase()) ){
                                    return item;
                                }
                            })).map((store)=>{
                                return( 
                                    <Grid key={store._id}  item sm={12} md={3}>
                                        <CarousselitemStores store={store}  />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </TabPanel>
            </TabContext>
        </Container>
    )
}

export default AllProducts
