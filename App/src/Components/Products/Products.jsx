import React, { useEffect,useState } from 'react'
import { Container, Collapse, Alert, Box} from '@mui/material';
import api from '../../Services/api';
import NewStoresFeed from './New Stores/NewStoresFeed';
import NewProductsFeed from './New Products/NewProductsFeed';



const Products = ({onAddToCart, newFav, fav}) => {

    const [products, setProducts] = useState([]);

    const [newStores, setNewStores] = useState([]);

    const [defProducts, setDefProducts] = useState(0);

    const [openAlert, setOpenAlert] = useState(false);

    const [categorys,setCategorys] = useState([])

    //const [order, setOrder] = useState(1);
    //const [filter, setFilter] =useState("");
    // const SortProducts = (e)=>{
        
    //     var newSort = [...products];
    //     //Low to High
    //     if(e.target.value==1){
    //         setOrder(1);
    //         newSort.sort(function(a, b) {
    //             return new Date(a.date_created) - new Date(b.date_created);
    //         });
    //         setProducts(newSort);
    //     }
    //     //Low to High
    //     if(e.target.value==2){
    //         setOrder(2);
    //         newSort.sort(function(a, b) {
    //         return a.price - b.price;
    //         });
    //         setProducts(newSort);
    //     }
            
    //     //High to Low
    //     if(e.target.value==3){
    //         setOrder(3);
    //         newSort.sort(function(a, b) {
    //         return b.price - a.price;
    //         });
    //         setProducts(newSort);
    //     }

    //     //New Arrivals
    //     if(e.target.value==4){
    //         setOrder(4);
    //         newSort.sort(function(a, b) {
    //         return new Date(b.date_created) - new Date(a.date_created);
    //         });
    //         setProducts(newSort);
    //     }
            
    // }


    // const filteredProducts = products.filter((product)=> {
    //     return Object.keys(product).some(key =>
    //         product[key].toString().toLowerCase().includes(filter)
    //         )
    // })

    useEffect(()=>{

        // setFilter("");

        // setOrder(1);

        api.get('feed/featuredProducts')
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

        api.get('feed/newStores')
        .then( response=>{
            
            setNewStores(response.data)
            console.log(newStores)
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

            <Box marginBottom={4}>
                <NewStoresFeed  newStores={newStores} />
            </Box>
            <Box marginBottom={4}>
                <NewProductsFeed  products={products} onAddToCart={onAddToCart} newFav={newFav} />
            </Box>
            {/* <Grid container spacing={2}>
                {products.map((product)=>{
                    console.log(product)
                    return(
                        <Grid item key={product._id} sm={12} md={3}>
                            <Product key={product._id} product={product}  onAddToCart={onAddToCart} newFav={newFav}></Product>
                        </Grid>
                    )})
                }
            </Grid> */}
        </Container>
    )
}

export default Products
