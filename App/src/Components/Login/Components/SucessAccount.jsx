import { Dialog, Box, DialogContent, DialogTitle, Typography, Stack, Button } from '@mui/material'
import { CheckCircle} from '@mui/icons-material'
import React from 'react'

const SucessAccount = ({open}) => {
    return (
        <Dialog
            open={open}
            onClose={()=>window.location.href="../feed/products"}
        >
            <DialogTitle></DialogTitle>
            <DialogContent>
                <Stack padding={2} alignItems={'center'} spacing={2}>
                    <CheckCircle sx={{color : 'green', width: 150, height : 150}}/>
                    <Typography variant="h6" textAlign={'center'}>Awesome!</Typography>
                    <Typography variant="body1" textAlign={'center'}>Check your email to verify your account!</Typography>
                    <Button fullWidth variant="contained" color="success" onClick={()=>window.location.href="../feed/products"}>OK</Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default SucessAccount
