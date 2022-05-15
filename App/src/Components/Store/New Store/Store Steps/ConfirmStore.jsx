import React from 'react'
import { Typography, TextField, Button, Box} from '@mui/material'
import { ArrowBack} from '@mui/icons-material';

const ConfirmStore = ({storeEmail,confirmStore,code, setCode, handleBack}) => {

    return (
        <>
            <Box>
                <ArrowBack onClick={handleBack}/>
            </Box>
            <Typography textAlign={'center'} variant="h6">Please insert the code that we've just sent to</Typography>
            <Typography textAlign={'center'} variant="subtitle2">{storeEmail}</Typography>
            <TextField label="Code" fullWidth defaultValue={code} onBlur={(e) => setCode(e.target.value)}></TextField>
            <Button variant="contained" color="success" onClick={confirmStore} fullWidth> Confirm</Button>
        </> 
    )
}

export default ConfirmStore
