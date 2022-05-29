import React, {useEffect,useState} from 'react'
import { List, ListItem, ListItemIcon, Drawer, IconButton, Divider, ListItemText, MenuItem , Avatar, Typography, Tooltip, Button} from '@mui/material';
import { ChevronLeft, Close, Dashboard, Inbox, LocalShipping, Settings, Storage, Store, Sync } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import api from '../../Services/api';
import useAuth from '../Contexts/useAuth';
import DrawerAlert from './Store Accounts/DrawerAlert';

const DrawerComponent = ({handleDrawerClose,openDrawer,setUpdate, update}) => {

    const {user,setStoreA, storeA} = useAuth();
    const [open, setOpen] = React.useState(false);

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

    const drawer = (
        <div>
          <List>
                <ListItem button onClick={handleClickOpen}>
                        <ListItemIcon>
                            <Sync /> 
                        </ListItemIcon>
                    <ListItemText primary="Change Store" />
                </ListItem>
                <ListItem button onClick={()=> window.location.href="../dashboard"}>
                        <ListItemIcon>
                            <Dashboard /> 
                        </ListItemIcon>
                    <ListItemText primary="Store Dashboard" />
                </ListItem>
                <ListItem button onClick={()=> window.location.href="../store/"+storeA._id}>
                        <ListItemIcon>
                            <Store /> 
                        </ListItemIcon>
                    <ListItemText primary="Store Profile" />
                </ListItem>
                <ListItem button onClick={()=> window.location.href="../storeProducts"}>
                        <ListItemIcon>
                            <Storage /> 
                        </ListItemIcon>
                    <ListItemText primary="Store Products" />
                </ListItem>
                <ListItem button onClick={()=> window.location.href="../storeOrders"}>
                        <ListItemIcon>
                            <LocalShipping /> 
                        </ListItemIcon>
                    <ListItemText primary="Store Orders" />
                </ListItem>
                <ListItem button onClick={()=> window.location.href="../storeSettings"}>
                        <ListItemIcon>
                            <Settings /> 
                        </ListItemIcon>
                    <ListItemText primary="Store Settings" />
                </ListItem>
          </List>
        </div>
      );

      const DrawerHeader = styled('div')(() => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'content-between',
        paddingBottom: 3
      }));

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
                <DrawerHeader >
                    {storeA && <>
                        <MenuItem >
                            <ListItemIcon>
                                <Avatar src={storeA?.store_image && 'https://tagmeapi.herokuapp.com/'+storeA?.store_image} />
                            </ListItemIcon>
                            <ListItemText primary={storeA?.store_name}/>
                            <IconButton onClick={handleDrawerClose} sx={{pr:2}} disableRipple>
                                <Tooltip title="close menu"  disableFocusListener disableTouchListener>
                                    <Close />
                                </Tooltip>
                            </IconButton>
                        </MenuItem>
                       
                        </>
                    }
                </DrawerHeader>
                <Divider />
                {storeA ? drawer : <Button variant="outlined" href="./newStore">CREATE A STORE</Button>}
            </Drawer>
            <DrawerAlert open={open} handleClose={handleClose} storeList={user.store} ChangeCurrentStore={ChangeCurrentStore} />
        </>
    )
}

export default DrawerComponent
