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


    useEffect(()=>{

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
        </Container>
    )
}

export default Products
