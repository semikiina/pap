import React from 'react'
import { Dialog, DialogTitle, DialogContent, ListItemButton, Link, ListItemAvatar, Avatar, List, ListItemText, Typography } from '@mui/material'

const DrawerAlert = ({open,handleClose,storeList}) => {



    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle sx={{textAlign:'center'}}>Change store</DialogTitle>
            <DialogContent>
                <List>
                    {
                        storeList?.map((store) => {
                            return <ListItemButton key={store._id}>
                                <ListItemAvatar>
                                    <Avatar src={'http://localhost:8090/'+store.store_image} />
                                </ListItemAvatar>
                                <ListItemText primary={store.store_name}  />
                            </ListItemButton>
                        })
                        
                    }
                </List>
            </DialogContent>
        </Dialog>
    )
}

export default DrawerAlert