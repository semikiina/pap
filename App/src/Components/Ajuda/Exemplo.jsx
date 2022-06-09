import { Notifications } from '@mui/icons-material';
import { Autocomplete, TextField , Button, Stack, Typography, ListItemText, Badge, IconButton} from '@mui/material';
import React , {useEffect, useState} from 'react';

import { io } from "socket.io-client";

const socket = io("ws://localhost:3001");


const Exemplo = () => {

    const [value, setValue] = useState(0);
    
    const handleButton = () => {

        socket.emit("sendOrderNotification", {token : localStorage.getItem('UAuthorization')});
    }

     socket.on("messageC", message =>{
        console.log(message)
    });

     socket.on("nots", nots =>{
        setValue(nots.notRead)
        console.log(nots)
    });

    useEffect(()=>{
        socket.emit('newUser', localStorage.getItem('UAuthorization'))
    }, [])

    return (
        <>
            <Button onClick={handleButton} variant="contained"> CREATE NOTIFICATION</Button>
            <IconButton>
                <Badge badgeContent={value} color="primary">
                    <Notifications color="action" />
                </Badge>
            </IconButton>
        </>
    )
}

export default Exemplo
