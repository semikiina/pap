import React, {useEffect,useState} from 'react'
import { List, ListItem, ListItemIcon, Drawer, IconButton, Divider, ListItemText, MenuItem , Avatar, Typography, Tooltip, Button} from '@mui/material';
import { ChevronLeft, Close, Inbox, LocalShipping, Settings, Storage, Store, Sync } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import api from '../../Services/api';
import useAuth from '../Contexts/useAuth';
import DrawerAlert from './Store Accounts/DrawerAlert';

const DrawerComponent = ({handleDrawerClose,openDrawer,storeid}) => {

    const {user} = useAuth();
    const [store, setStore] = useState({});
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(()=>{
        if(storeid)
        api.get('store/'+storeid)
        .then(data=>{
            setStore({
                store_name: data.data.store_name,
                store_image :  data.data.store_image
            })
        })
        .catch(err => {
            console.log(err)
        })

    },[storeid])

    const drawer = (
        <div>
          <List>
                <ListItem button onClick={handleClickOpen}>
                        <ListItemIcon>
                            <Sync /> 
                        </ListItemIcon>
                    <ListItemText primary="Change Store" />
                </ListItem>
                <ListItem button onClick={()=> window.location.href="../store/"+storeid}>
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
                <ListItem button>
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

    if(!store) return null;
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
                <DrawerHeader justifyContent="flex-end">
                    {store.store_name && <MenuItem >
                        <ListItemIcon>
                            <Avatar src={'http://localhost:8090/'+store?.store_image} sx={{mr:2}}/>
                        </ListItemIcon>
                        <Typography  textAlign="center" >{store?.store_name}</Typography>
                    </MenuItem>}
                    <IconButton onClick={handleDrawerClose} >
                        <Tooltip title="close menu"  disableFocusListener disableTouchListener>
                            <Close />
                        </Tooltip>
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {store.store_name ? drawer : <Button variant="outlined" href="./newStore">CREATE A STORE</Button>}
            </Drawer>
            <DrawerAlert open={open} handleClose={handleClose} storeList={user.store}/>
        </>
    )
}

export default DrawerComponent
