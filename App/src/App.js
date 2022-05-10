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
import RequireAuth from './Components/Contexts/RequireAuth';

import Exemplo from './Components/Ajuda/Exemplo';
import useAuth from './Components/Contexts/useAuth';
import StoreOrders from './Components/Store/Store Orders/StoreOrders';
import DrawerComponent from './Components/Drawer/DrawerComponent';
import EditProduct from './Components/Store/Store Products/EditProduct';
import NewStore from './Components/Store/New Store/NewStore';

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

	const {user,setUser} = useAuth();
	const [store, setStore] = useState();
    const [cart, setCart] = useState([]);
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const [favorite, setFavorite] = useState([]);
	const [fav, setFav] = useState(0);
	const [openDrawer, setOpenDrawer] = useState(false);

	const handleDrawerOpen = () => {
		setOpenDrawer(true);
	};

	const handleDrawerClose = () => {
		setOpenDrawer(false);
	};

    const AddToCart = (productId, quantity)=>{
        api.post('user/cart',{
            product_id:productId,
            quantity: quantity
        })
        .then( res=>{
			setFav(fav+1)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const RemoveFromCart = (productId)=>{
        api.delete('user/cart/'+productId)
        .then( res=>{
			setFav(fav+1)
        })
        .catch(err=>{
            console.log(err)
        })
    }

	const newFavorite = (id) =>{
        api.post('user/fav/'+id)
        .then(data=>{
            setFav(fav+1)
        })
        
    }

	useEffect(()=>{
		if(localStorage.getItem('UAuthorization')){
			api.get('user/profile')
				.then(user=>{
					console.log(user.data)
					if(user?.store)setStore(user.data.store[0]._id)
					setUser(user.data)
					setCart(user.data.cart)
					setFavorite(user.data.favorite)
				})
				.catch(err=>{
					console.log(err)
				})
		}
	},[fav])


	return (
		<ThemeProvider theme={THEME}>
			<Router>

				<Navbar onRemoveFromCart={RemoveFromCart} handleDrawerOpen={handleDrawerOpen} openDrawer={openDrawer}/>
				<DrawerComponent handleDrawerClose={handleDrawerClose} openDrawer={openDrawer} storeid={store}/>
				
				<Routes>
					<Route exact path='/login' element={<Login />}/>
						<Route exact path='/' element={<Products onAddToCart={AddToCart}  newFavorite={newFavorite} />}/>
						<Route exact path='/products/:id' element={<DetailsP newFavorite={newFavorite} fav={fav} />}/>
					<Route element={<RequireAuth/>}>
						<Route exact path='/cart' element={<Cart Cart={cart} onRemoveFromCart={RemoveFromCart}/>}/>
						<Route exact path='/checkout' element={<Checkout Cart={cart} />}/>
						<Route exact path='/favorite' element={<Favorite favorite={favorite}  newFavorite={newFavorite}/>}/>
						<Route exact path='/profile' element={<Profile setFav={setFav} fav={fav} />}/>
						<Route exact path='/orders' element={<Orders storeid={store}/>}/>
					
						<Route exact path='/newStore' element={<NewStore />}/>
						<Route exact path='/store/:id' element={<Store />}/>
						<Route exact path='/storeProducts' element={<StoreProduct storeid={store} />}/>
						<Route exact path='/storeOrders' element={<StoreOrders storeid={store} />}/>
						<Route exact path='/addProduct' element={<AddProduct storeid={store}/>}/>
						<Route exact path='/editProduct/:id' element={<EditProduct storeid={store}/>}/>
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
