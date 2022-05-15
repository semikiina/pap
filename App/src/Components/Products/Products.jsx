import React, { useEffect,useState } from 'react'
import {Grid, Container, Paper, Typography, Stack, Box, Select, MenuItem, FormControl, InputLabel, Button, Collapse, Alert} from '@mui/material';
import Product from './Product/Product';
import api from '../../Services/api';
import ProductFilters from './Filters/ProductFilters';



const Products = ({onAddToCart, newFav, fav}) => {

    const [products, setProducts] = useState([]);
    const [defProducts, setDefProducts] = useState(0);
    const [order, setOrder] = useState(1);
    const [openAlert, setOpenAlert] = useState(false);
    const [filter, setFilter] =useState("");
    const [categorys,setCategorys] = useState([])

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


    const filteredProducts = products.filter((product)=> {
        return Object.keys(product).some(key =>
            product[key].toString().toLowerCase().includes(filter)
            )
    })

    useEffect(()=>{
        setFilter("");
        setOrder(1);
        api.get('product')
        .then(products =>{
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
    },[fav, defProducts])

    return (
       <Container>
            <Collapse in={openAlert} >
                <Alert onClose={() => {
                    setOpenAlert(false);
                }} severity="error">An error occured, try again later!</Alert>
            </Collapse>
           <Grid container spacing={2}>
                <Grid item sm={12} md={3}>
                    <ProductFilters categorys={categorys} setFilter={setFilter} SortProducts={SortProducts} filter={filter} defProducts={defProducts} setDefProducts={setDefProducts} order={order} setOrder={setOrder} />
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
