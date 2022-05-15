import { Typography, TextField, Button} from '@mui/material'
import React , {useState} from 'react'

const BasicInfos = ({handleNext,storeName,setStoreName,storeEmail,setStoreEmail}) => {
    return (
        <>
            <Typography textAlign={'center'} variant="h6">Let's start with some basic informations</Typography>
            <TextField label="Store Name" fullWidth defaultValue={storeName} onBlur={(e) => setStoreName(e.target.value)}></TextField>
            <TextField label="Store Email" fullWidth defaultValue={storeEmail} onBlur={(e) => setStoreEmail(e.target.value)}></TextField>
            <Button variant="contained" onClick={handleNext} fullWidth> next</Button>
        </>   
    )
}

export default BasicInfos
