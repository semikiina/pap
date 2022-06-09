import { RemoveRedEye, Lock } from '@mui/icons-material';
import { Avatar, Box, Chip, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import useAuth from '../../../Contexts/useAuth';

const StoreSection = ({store,active }) => {

    const {user, storeA} = useAuth();

    if(!store) return null;
    return (
            <ListItem disableGutters>
                <ListItemButton  onClick={()=>{ window.location.href="../store/"+store._id}} disableRipple>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={"http://localhost:8090/"+store.store_image}  variant="square"/>
                    </ListItemAvatar>
                    <ListItemText 
                        primary={store.store_name}
                        secondary={`Created by ${store.creator_id?.first_name + " " + store.creator_id?.last_name}`}
                    />
                </ListItemButton>
                <Box>
                {
                    (store.collaborators?.some(e => e.user_id == user._id) && storeA._id == store._id ) && 
                    <Chip icon={active ? <RemoveRedEye/> :  <Lock />} label={ active ? "Public" :"Private"} color={ active ? "success" :"primary"} variant="outlined" />
                }
                </Box>
            </ListItem>
    )
}

export default StoreSection
