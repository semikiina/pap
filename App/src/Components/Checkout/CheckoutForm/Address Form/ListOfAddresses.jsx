import { List, ListItem, ListItemButton, ListItemText, Checkbox, ListItemIcon, RadioGroup, Radio , Button, Typography, Stack, Grid} from '@mui/material';
import React, { useState } from 'react'
import useAuth from '../../../Contexts/useAuth';
import { useForm } from "react-hook-form";
import { Box } from '@mui/system';

const ListOfAddresses = ({next, setNewAddress, setExAddress}) => {

    const {user} = useAuth();

    const handleChange = (e) =>{
        setExAddress(e.target.value)
    }

    return (
        <>
        
           
            <List>
                <RadioGroup defaultValue="newAddress" onChange={(e) => handleChange(e)}>
                {
                    user.addresses?.map((address)=>{
                        return (
                            <ListItem key={address._id} disablePadding>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <Radio edge="start" value={address._id}  onClick={() => setNewAddress(false)}></Radio>
                                    </ListItemIcon>
                                    <ListItemText primary={address.first_name + " " + address.last_name} secondary={
                                        <React.Fragment>
                                            <Stack component='span'>
                                                <Typography component="span" variant="body2">{address.phone_code + " " + address.phone + ", " + address.country  }</Typography>  
                                                <Typography component="span" variant="body2">{address.address_1 + ", " + address.zip_code + ", " + address.province + ", " + address.city  }</Typography>  
                                            </Stack>
                                        </React.Fragment>
                                    }/>
                                </ListItemButton>
                                
                            </ListItem>
                        )
                    })
                }
                    <ListItem disablePadding alignItems="flex-start">
                        <ListItemButton  >
                            <ListItemIcon>
                                <Radio edge="start" value="newAddress" onClick={() => setNewAddress(true)} ></Radio>
                            </ListItemIcon>
                            <ListItemText primary={'Add a new shipping address instead'}></ListItemText>
                        </ListItemButton>
                    </ListItem>
               </RadioGroup>
            </List>
          
        </>
    )
}

export default ListOfAddresses
