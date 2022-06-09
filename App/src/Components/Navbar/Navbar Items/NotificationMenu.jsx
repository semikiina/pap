import React from 'react'
import { MenuItem, Menu, Typography, ListItemIcon, Button, ListItemText, List, ListItem, Avatar, ListItemAvatar, ListItemButton, Divider, Badge, Stack} from '@mui/material';
import useAuth from '../../Contexts/useAuth';
import { Circle } from '@mui/icons-material';

const NotificationMenu = ({handleCloseNotificationMenu, anchorElNotification , nots}) => {


    const handleNotificationClick = (notification) => {

        if(notification.ref_type == 1) window.location.href="../storeOrders"
        if(notification.ref_type == 2) window.location.href="../products/"+notification.product_id._id
        if(notification.ref_type == 3) window.location.href="../storeProfile/"+notification.store_id._id
        if(notification.ref_type == 4) window.location.href="../editProduct/"+notification.product_id._id
        if(notification.ref_type == 5) window.location.href="../storeProfile/"+notification.store_id._id
    }

    if(!nots) return null;
    return (
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElNotification}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElNotification)}
            onClose={handleCloseNotificationMenu}
        >
            <Typography padding={1} paddingLeft={2} >Notifications</Typography>
            <Divider variant="middle"/>
            {
                nots.length 
                ? <List>
                {
                    nots.map((notification) => {
                        return <ListItemButton onClick={() => handleNotificationClick(notification)} key={notification._id}>
                            <Stack direction = "row" spacing={2} alignItems={'center'}>
                               
                                {notification.product_id &&
                                    <ListItemAvatar>
                                        <Avatar src={`http://localhost:8090/${notification.product_id.images[0]}`} variant="square"/>
                                    </ListItemAvatar>
                                }
                                <ListItemText primary={notification.message} secondary={new Date(notification.date_created).toLocaleString()} />
                                {
                                    !notification.read && <Circle color="primary" sx={{ width: 10, height : 10}}/>
                                }
                            </Stack>
                            
                        </ListItemButton>
                    })
                }
                </List>

                : <Typography variant="subtitle2" padding={3}>Your notifications will appear here.</Typography>
            }

            
        </Menu>
    )
}

export default NotificationMenu
