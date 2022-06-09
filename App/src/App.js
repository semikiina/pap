import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useEffect, useState } from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import {Products, DetailsP, Cart, Checkout, Navbar, Error, Login, AddProduct, Store, Favorite, Profile,Orders } from './Components/index';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
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
import AllProducts from './Components/Products/All Products/AllProducts';
import CreateStoreDialog from './Components/New Accounts/CreateStoreDialog';
import ConfirmStore from './Components/Store/New Store/Store Steps/ConfirmStore';
import StoreSettings from './Components/Store/Store Settings/StoreSettings';
import ConfirmInvite from './Components/Store/Store Invites/ConfirmInvite';

import { io } from "socket.io-client";
const socket = io("ws://localhost:3001");


const THEME = createTheme({
	typography: {
		fontFamily: [
			'Poppins',
		  '-apple-system',
		  'BlinkMacSystemFont',
		  '"Segoe UI"',
		].join(','),
	},
	palette: {
		mode: 'light',
		primary: {
		  main: '#ccd5ae',
		  contrastText: "#fff"
		},
		secondary: {
		  main: '#d4a373',
		  contrastText: "#fff"
		},
		success:{
			main:"#606c38",
		},
		info:{
			main:"#fefae0",
			contrastText: "#000"
		},
		warning:{
			main:"#f4a261"
		}
	  },
 });


const App = () => {

	// cpyclipboard.select();
	// document.execCommand("copy");

	const {setUser, setStoreA} = useAuth();

	const [update, setUpdate] = useState(0)

    const [cart, setCart] = useState([]);

	const [favorite, setFavorite] = useState([]);

	const [fav, setFav] = useState(0);


	const [openNewUserStore, setOpenNewUserStore] = useState(false);

	const handleCloseNewUserStore = () =>{
		setOpenNewUserStore(false);
	}


	const [openDrawer, setOpenDrawer] = useState(false);

	const handleDrawerOpen = () => {
		setOpenDrawer(true);
	};

	const handleDrawerClose = () => {
		setOpenDrawer(false);
	};

    const AddToCart = (productId, quantity, skuid)=>{
        api.post('user/cart',{
            product_id:productId,
            quantity: quantity,
			skuid : skuid
        })
        .then( res=>{
			setFav(fav+1)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const RemoveFromCart = (productId, skuid)=>{

        api.post('user/cart/'+productId ,{
			skuid: skuid
		})
        .then( res=>{
			setFav(fav+1)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const RemoveQuantity = (productId, skuid)=>{
        api.post('user/removeq/'+productId ,{
			skuid: skuid
		})
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
			if(data.data.fav){
				socket.emit('sendFavoriteNotification', id)
			}
            setFav(fav+1)
        })
        
    }

	const [userRole, setUserRole] = useState();

	const storeLogin = (storeid, userid) =>{
		
		if(!storeid && !sessionStorage.getItem('newUserDialog')){ 
			sessionStorage.setItem('newUserDialog','true')
			setOpenNewUserStore(true);
		}
		else if(!localStorage.getItem('SAuthorization') && storeid){
			api.get('store/login/'+storeid)
				.then(store=>{
					setStoreA(store.data.store)
					setUserRole(store.data.collaborators?.find((collab)=> collab.user_id._id == userid)?.role)
					localStorage.setItem('SAuthorization',store.data.stoken)
				})
				.catch(err=>{
					console.log(err)
				})
		}
		
	}

	const [notCount , setNotCount] =useState(0);
	const [nots , setNots] = useState([]);
	const [updateNots, setUpdateNots] = useState(0);

	const handleClearNotifications = () => {
		if(notCount>0){
			api.get('notification/clear')
			.then(nots=>{
				setUpdateNots(updateNots +1)
			})
			.catch(err=>{
				console.log(err)
			})
		}
		
	}



	useEffect(()=>{
		if(localStorage.getItem('UAuthorization')){
			let storeID = localStorage.getItem('SAuthorization') || null
			api.get('user/profile')
				.then(user=>{
					socket.emit('newUser', localStorage.getItem('UAuthorization'), storeID)
					storeLogin(user.data?.store[0]?._id, user.data._id)
					setUser(user.data)
					setCart(user.data.cart)
					setFavorite(user.data.favorite)
					setUpdate(update +1)
				})
				.catch(err=>{
					console.log(err)
				})

			
		}
		
	},[fav])

	useEffect(()=>{
		if(localStorage.getItem('SAuthorization')){
			api.get('notification')
			.then(nots=>{
				setNotCount(nots.data.notRead);
				setNots(nots.data.nots)
			})
			.catch(err=>{
				console.log(err)
			})
		}
	},[updateNots])

	socket.on("notification", data =>{
		setNotCount(notCount +1);
		setNots([ data, ...nots ])
    });

	return (
		<ThemeProvider theme={THEME}>
			<CssBaseline />
			<Router>

				<Navbar onRemoveFromCart={RemoveFromCart} handleDrawerOpen={handleDrawerOpen} openDrawer={openDrawer} notCount={notCount} nots={nots} handleClearNotifications={handleClearNotifications} onAddToCart={AddToCart} onRemoveQuantity={RemoveQuantity} userRole={userRole} />
				<DrawerComponent handleDrawerClose={handleDrawerClose} openDrawer={openDrawer} update={update} setUpdate={setUpdate} userRole={userRole} setUserRole={setUserRole} />
				<CreateStoreDialog open={openNewUserStore} handleClose={handleCloseNewUserStore} />
				<Routes>
					<Route exact path='/exemplo' element={<Exemplo />}/>
					<Route exact path='/login' element={<Login />}/>
					<Route exact path='/' element={<Products onAddToCart={AddToCart}  newFav={newFavorite} fav={fav} />}/>
					<Route exact path='/products/:id' element={<DetailsP newFavorite={newFavorite} fav={fav} onAddToCart={AddToCart}/>}/>
					<Route exact path='/feed/:opt' element={<AllProducts  onAddToCart={AddToCart}  newFav={newFavorite} fav={fav}/>}/>
					<Route exact path='/store/:id' element={<Store />}/>
					<Route element={<RequireAuth/>}>
						<Route exact path='/cart' element={<Cart Cart={cart} onRemoveFromCart={RemoveFromCart} onAddToCart={AddToCart} onRemoveQuantity={RemoveQuantity}/>}/>
						<Route exact path='/checkout' element={<Checkout Cart={cart} setUpdateNots={setUpdateNots} />}/>
						<Route exact path='/favorite' element={<Favorite favorite={favorite}  newFavorite={newFavorite}/>}/>
						<Route exact path='/profile' element={<Profile setFav={setFav} fav={fav} />}/>
						<Route exact path='/orders' element={<Orders />}/>
						<Route exact path='/newStore' element={<NewStore />}/>
						<Route exact path='/storeSettings' element={<StoreSettings update={update} setUpdate={setUpdate} />}/>
						<Route exact path='/confirmStore/:email' element={<ConfirmStore />}/>
						<Route exact path='/storeProducts' element={<StoreProduct  userRole={userRole}  />}/>
						<Route exact path='/storeOrders' element={<StoreOrders  />}/>
						<Route exact path='/addProduct' element={<AddProduct />}/>
						<Route exact path='/editProduct/:id' element={<EditProduct />}/>
						<Route exact path='/dashboard' element={<Dashboard />}/>
						<Route exact path='/confirmInvite/:id' element={<ConfirmInvite />}/>
					</Route>
					<Route exact path='*' element={<Error/>}/>
				</Routes>
			</Router>
		</ThemeProvider>
	)
}

export default App
