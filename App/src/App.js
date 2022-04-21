import React, { useEffect, useState } from 'react'
import {Products, DetailsP, Cart, Checkout, Navbar, Home, Error, Login, AddProduct, Store } from './Components/index';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import {LinearProgress, Skeleton} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from './Services/api';


const THEME = createTheme({
	typography: {
		fontFamily: [
			'Poppins',
		  '-apple-system',
		  'BlinkMacSystemFont',
		  '"Segoe UI"',
		  'Roboto',
		  '"Helvetica Neue"',
		  'Arial',
		  'sans-serif',
		  '"Apple Color Emoji"',
		  '"Segoe UI Emoji"',
		  '"Segoe UI Symbol"',
		].join(','),
	  },
 });


const App = () => {

	const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState('');

    const fetchProduct = async () =>{

        const products = await api.get('product')
        setProduct(products.data)
    };

    const fetchCart =() =>{
        api.get('user/620ac00c85d485580493d87f')
        .then(({data})=>{
			setCart(data.cart)
        })
        .catch(err=>{
            console.log(err)
        })
    };

    const AddToCart = (productId, quantity)=>{
        api.post('user/ncart',{
            userId:'620ac00c85d485580493d87f',
            product_id:productId,
            quantity: quantity
        })
        .then( res=>{
			console.log( 'add ok')
			fetchCart()
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const RemoveFromCart = (productId)=>{
        api.delete('user/cart/620ac00c85d485580493d87f/'+productId)
        .then( res=>{
			console.log( 'delete ok')
			fetchCart()
        })
        .catch(err=>{
            console.log(err)
        })
    }

	const refreshCart = async () => {
		const newCart = "null";
	
		setCart(newCart);
	};

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await api.post('order');

			setOrder(incomingOrder);

			refreshCart();
		} catch (error) {
			setErrorMessage(error.data.error.message);
		}
	};
	

	useEffect(()=>{
        fetchCart();
		fetchProduct();
	},[])


	return (
		<ThemeProvider theme={THEME}>
			<Router>
				{
					cart.length === 0 ? <Skeleton variant="rectangular" width={'100%'} height={50} margin={0} padding={0} position='fixed'/> : <Navbar Cart={cart}></Navbar>
				}
				<Routes>
					<Route exact path='/' element={<Home/>}/>
					<Route exact path='/category' element={<Products onAddToCart={AddToCart}  product={product}  />}/>
					<Route exact path='/products/:id' element={<DetailsP/>}/>
					<Route exact path='/cart' element={<Cart Cart={cart} onRemoveFromCart={RemoveFromCart}/>}/>
					<Route exact path='/checkout' element={<Checkout Cart={cart} />}/>
					<Route exact path='/login' element={<Login />}/>
					<Route exact path='/addProduct' element={<AddProduct />}/>
					<Route exact path='/store/:id' element={<Store />}/>
					<Route exact path='*' element={<Error/>}/>
				</Routes>
			</Router>
		</ThemeProvider>
	)
}

export default App
