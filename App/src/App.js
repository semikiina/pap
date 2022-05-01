import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useEffect, useState } from 'react'
import {Products, DetailsP, Cart, Checkout, Navbar, Error, Login, AddProduct, Store, Favorite, Profile,Orders } from './Components/index';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import {Skeleton} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from './Services/api';
import StoreProduct from './Components/Store/Store Products/StoreProducts';
import Dashboard from './Components/Dashboard/Dashboard';
import RequireAuth from './Components/hooks/RequireAuth';

import Exemplo from './Components/Ajuda/Exemplo';

const THEME = createTheme({
	typography: {
		fontFamily: [
			'Poppins',
		  '-apple-system',
		  'BlinkMacSystemFont',
		  '"Segoe UI"',
		].join(','),
	  },
 });


const App = () => {

	const [product, setProduct] = useState([]);
	const [store, setStore] = useState();
	const [user, setUser] = useState([]);
    const [cart, setCart] = useState([]);
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const [favorite, setFavorite] = useState([]);
	const [fav, setFav] = useState(0);
	const userId= '620ac00c85d485580493d87f';

   

    const fetchProduct = async () =>{

        const products = await api.get('product')
        setProduct(products.data)
    };

    const fetchCart =() =>{
        api.get('user/'+userId)
        .then(({data})=>{
			setStore(data.store[0]._id)
			setUser(data)
			setCart(data.cart)
			setFavorite(data.favorite)
        })
        .catch(err=>{
            console.log(err)
        })
    };

    const AddToCart = (productId, quantity)=>{
        api.post('user/ncart',{
            userId: userId,
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
        api.delete('user/cart/'+userId+'/'+productId)
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
	
	const newFavorite = (id) =>{
        api.post('user/nfav/'+userId+'/'+id)
        .then(({data})=>{
            setFav(fav+1)
        })
        
    }

	useEffect(()=>{
        fetchCart();
		fetchProduct();
	},[fav])


	return (
		<ThemeProvider theme={THEME}>
			<Router>
				{
					cart.length === 0 ? <Skeleton variant="rectangular" width={'100%'} height={50} margin={0} padding={0} position='fixed'/> : <Navbar Cart={cart} storeid={user.store[0]._id} onRemoveFromCart={RemoveFromCart}></Navbar>
				}
				<Routes>
					<Route exact path='/' element={<Products onAddToCart={AddToCart}  product={product} newFavorite={newFavorite} userId={userId} />}/>
					<Route exact path='/products/:id' element={<DetailsP newFavorite={newFavorite} fav={fav} userId={userId}/>}/>

					<Route exact path='/cart' element={<Cart Cart={cart} onRemoveFromCart={RemoveFromCart}/>}/>
					<Route exact path='/checkout' element={<Checkout Cart={cart} userId={userId}/>}/>
					<Route exact path='/favorite' element={<Favorite favorite={favorite}  newFavorite={newFavorite}/>}/>
					<Route exact path='/profile' element={<Profile user={user} setUser={setUser}/>}/>
					<Route exact path='/orders' element={<Orders userId={userId} />}/>
					<Route exact path='/login' element={<Login />}/>

					<Route element={<RequireAuth/>}>
						<Route exact path='/store/:id' element={<Store />}/>
						<Route exact path='/storeProducts' element={<StoreProduct storeid={store} />}/>
						<Route exact path='/addProduct' element={<AddProduct storeid={store}/>}/>
						<Route exact path='/dashboard' element={<Dashboard />}/>
						<Route exact path='/exemplo' element={<Exemplo />}/>
					</Route>
					
					<Route exact path='*' element={<Error/>}/>
				</Routes>
			</Router>
		</ThemeProvider>
	)
}

export default App
