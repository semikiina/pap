import React, {useEffect,useState} from 'react'
import { List, ListItem, ListItemIcon, Drawer, IconButton, Divider, ListItemText, MenuItem , Avatar, Typography, Tooltip, Button, Stack} from '@mui/material';
import { ChevronLeft, Close, Dashboard, Inbox, LocalShipping, Settings, Storage, Store, Sync } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import api from '../../Services/api';
import useAuth from '../Contexts/useAuth';
import DrawerAlert from './Store Accounts/DrawerAlert';



const DrawerComponent = ({handleDrawerClose,openDrawer,setUpdate, update, userRole, setUserRole}) => {


    const {user,setStoreA, storeA} = useAuth();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setUpdate(update +1)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const ChangeCurrentStore = (storeid) =>{
        api.get('store/login/'+storeid)
        .then(store=>{
            localStorage.setItem('SAuthorization',store.data.stoken)
            window.location.reload()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{

        if(localStorage.getItem('SAuthorization'))
        api.get('store/profile')
        .then(data=>{
            setStoreA(data.data)
            
        })
        .catch(err => {
            console.log(err)
        })
    },[update])

    useEffect(()=> {
        if(storeA.collaborators){
            console.log(storeA.collaborators?.find((collab)=> collab.user_id._id == user._id)?.role)
            setUserRole(storeA.collaborators?.find((collab)=> collab.user_id._id == user._id)?.role)
        }
    },[storeA,update])


    if(!storeA) return null;
    return (
        <>
            <Drawer
                sx={{
                    width: 250,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={openDrawer}
                
            >
                {storeA && 
                    <Stack direction="row" justifyContent={'space-between'}  alignItems={'center'} paddingRight={1}>
                        <ListItem>
                            <ListItemIcon>
                                <Avatar src={storeA?.store_image && 'http://localhost:8090/'+storeA?.store_image} />
                            </ListItemIcon>
                            <Typography variant="subtitle2">{storeA.store_name}</Typography>
                        </ListItem>
                        <IconButton onClick={handleDrawerClose}  >
                            <Close  />
                        </IconButton>
                    </Stack>
                }
                <Divider />
                <List>
                    <ListItem button onClick={handleClickOpen}>
                            <ListItemIcon>
                                <Sync color="secondary"/> 
                            </ListItemIcon>
                        <ListItemText primary="Change Store" />
                    </ListItem>
                    <ListItem button onClick={()=> window.location.href="../store/"+storeA._id}>
                            <ListItemIcon>
                                <Store color="secondary"/> 
                            </ListItemIcon>
                        <ListItemText primary="Store Profile" />
                    </ListItem>
                    <ListItem button onClick={()=> window.location.href="../storeProducts"}>
                            <ListItemIcon>
                                <Storage color="secondary"/> 
                            </ListItemIcon>
                        <ListItemText primary="Store Products" />
                    </ListItem>
                   {userRole < 3 &&
                        <>
                            <ListItem button onClick={()=> window.location.href="../dashboard"}>
                                    <ListItemIcon>
                                        <Dashboard color="secondary"/> 
                                    </ListItemIcon>
                                <ListItemText primary="Store Dashboard" />
                            </ListItem>
                            <ListItem button onClick={()=> window.location.href="../storeOrders"}>
                                    <ListItemIcon>
                                        <LocalShipping color="secondary"/> 
                                    </ListItemIcon>
                                <ListItemText primary="Store Orders" />
                            </ListItem>
                        </>
                    }
                    <ListItem button onClick={()=> window.location.href="../storeSettings"}>
                            <ListItemIcon>
                                <Settings color="secondary"/> 
                            </ListItemIcon>
                        <ListItemText primary="Store Settings" />
                    </ListItem>
                </List>
            </Drawer>
            <DrawerAlert open={open} handleClose={handleClose} storeList={user.store} ChangeCurrentStore={ChangeCurrentStore} />
        </>
    )
}

export default DrawerComponent
