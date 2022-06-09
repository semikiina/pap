import { Store } from '@mui/icons-material'
import { Dialog, Box, DialogContent, DialogTitle, Typography, Stack, Button } from '@mui/material'
import React from 'react'

const CreateStoreDialog = ({open, handleClose}) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
        <DialogTitle></DialogTitle>
            <DialogContent>
                <Stack padding={2} alignItems={'center'} spacing={2}>
                    <Store sx={{width:150, height: 150, color: 'gray'}}/>
                    <Typography variant="h6" textAlign={'center'}>Do you want to become your own boss?</Typography>
                    <Typography variant="body1" textAlign={'center'}>Start by creating a store!</Typography>
                    <Button fullWidth variant="contained" color="secondary" onClick={()=>window.location.href="../newStore"}>Create a new Store</Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default CreateStoreDialog
