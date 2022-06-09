import React from 'react'
import { Dialog , DialogTitle, DialogContent, ListItemText, Divider, Stack, ListItem, List, IconButton, ListItemAvatar, Avatar, Tooltip, Box, Typography } from '@mui/material'
import { AutoDelete, AutoDeleteOutlined, Close, History, Restore, RestoreFromTrash } from '@mui/icons-material'


const DeletedProducts = ({open, handleClose, removedProducts, handleRestore}) => {


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth={'md'}
        >
            <DialogTitle >
                <Stack direction="row" justifyContent={'space-between'}>
                    <Stack direction="row" alignItems={'center'} spacing={1}>
                        <History sx={{width :40, height : 40}} />
                        <ListItemText primary={'Removed Products'} secondary="Products with more than 30 days will be deleted." />
                    </Stack>
                    <IconButton onClick={handleClose}>
                        <Close/>
                    </IconButton>
                </Stack>
                
                </DialogTitle>
            <Divider variant="middle"/>
            <DialogContent>
                <List>
                    {removedProducts.length
                     ?   removedProducts.map((product) => {
                            return (
                            <ListItem
                            key={product._id}
                                secondaryAction={
                                    <Tooltip title="Restore">
                                        <IconButton edge="end" onClick={() => handleRestore(product._id)}>
                                             <RestoreFromTrash />
                                        </IconButton>
                                    </Tooltip>
                                        
                                }
                            >
                            <ListItemAvatar>
                                <Avatar src={`http://localhost:8090/${product.images[0]}`} />
                            </ListItemAvatar>
                            <ListItemText primary={product.title} secondary={`Removed at ${new Date(product.removedDate).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}  />
                            </ListItem>
                        )})
                        : <Stack alignItems={'center'}>
                            <AutoDeleteOutlined sx={{width:50 , height : 50}}/>
                            <Typography variant="subtitle2"  >Your removed products will appear here.</Typography>
                        </Stack>
                    }
                </List>
            </DialogContent>
        </Dialog>
    )
}

export default DeletedProducts
