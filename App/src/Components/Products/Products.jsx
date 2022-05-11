import React, { useEffect,useState } from 'react'
import {Grid, Container, Paper, Typography, Stack, Box, Select, MenuItem, FormControl, InputLabel, Button, Collapse, Alert} from '@mui/material';
import Product from './Product/Product';
import api from '../../Services/api';



const Products = ({onAddToCart, newFav}) => {

    const [products, setProducts] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState(false);
    const [filter, setFilter] =useState("");
    const [categorys,setCategorys] = useState([])
    var dproducts =[];

    const SortProducts = (e)=>{
        
        var newSort = [...products];
        //Low to High
        if(e.target.value==1){
            newSort.sort(function(a, b) {
                return new Date(a.date_created) - new Date(b.date_created);
            });
            setProducts(newSort);
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
        api.get('product')
        .then(products =>{
            dproducts= products.data
            console.log(dproducts)
            setProducts(products.data)
        })
        .catch(err=>{
            console.log(err)
        })
        api.get('product/categorys')
        .then(cats=>{
            setCategorys(cats.data)
        })
        .catch(err=>{
            setOpenAlert(true)
            console.log(err)
        })
    },[])

    return (
       <Container>
            <Collapse in={openAlert} marginBottom={2}>
                <Alert onClose={() => {
                    setOpenAlert(false);
                }} severity="error">An error occured, try again later!</Alert>
            </Collapse>
           <Grid container spacing={2}>
                <Grid item sm={12} md={3}>
                    <Paper>
                        <Stack padding={2} spacing={2}>
                            <Typography variant="h6" textAlign="center">Filters</Typography>
                            <FormControl fullWidth >
                                <InputLabel id="orderbyid">Order By</InputLabel>
                                <Select
                                    labelId="orderbyid"
                                    label="Order By"
                                    defaultValue={1}
                                    inputProps={{ 'aria-label': 'Order by' }}
                                    onChange={SortProducts}
                                    >
                                    <MenuItem value={1}>Recommended</MenuItem>
                                    <MenuItem value={2}>Price Low to High</MenuItem>
                                    <MenuItem value={3}>Price High to Low</MenuItem>
                                    <MenuItem value={4}>New Arrivals</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth >
                                <InputLabel id="categoryid">Category</InputLabel>
                                <Select
                                    labelId="categoryid"
                                    label="Category"
                                    inputProps={{ 'aria-label': 'Category' }}
                                    onChange={(e)=> setFilter(e.target.value)}
                                    >
                                       {
                                            categorys.map((cat)=>{
                                                return <MenuItem value={cat} key={cat}>{cat}</MenuItem>
                                            })
                                       }
                                </Select>
                            </FormControl>
                            <Button color="error">Clear all Filters</Button>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item container spacing={2} sm={12} md={9} >
                    {filteredProducts.map((product)=>{
                        return(
                            <Grid item key={product._id} sm={12} md={4}>
                                <Product key={product._id} product={product}  onAddToCart={onAddToCart} newFav={newFav}></Product>
                            </Grid>
                        )})
                    
                    }
            </Grid>
           </Grid>
           
           
        </Container>
    )
}

export default Products
