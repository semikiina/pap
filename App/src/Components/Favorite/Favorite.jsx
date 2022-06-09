import { CircularProgress, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Container, Stack, Divider, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, Box, IconButton, ListItemIcon, ListItemButton } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const Favorite = ({favorite,newFavorite}) => {
    
    if(!favorite) return <CircularProgress/>
    return (
        <>
            <Container>
                <Typography variant="h5" padding={2}>My wishlist</Typography>
                <Divider></Divider>
                {
                    favorite.length 
                    ? <Grid container spacing={3} marginTop={1}>
                    {favorite.map((product)=>{
                        
                        return(
                            <Grid item key={product._id} sm={12} lg={6} >
                                <Paper>
                                    <Box padding={2}>
                                        <Stack direction="row" spacing={2} alignItems={'center'} >
                                            <IconButton onClick={()=>newFavorite(product._id)}>
                                                <DeleteIcon size="small" color="error"></DeleteIcon>
                                            </IconButton>
                                            <ListItemButton onClick={()=> window.location.href="../products/"+product._id} >
                                                <Stack direction="row" spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                                                    <ListItemAvatar>
                                                        <Avatar src={"http://localhost:8090/" + product.images[0]} variant="square" sx={{width: 100,height: 100}} />
                                                    </ListItemAvatar>
                                                    <ListItemText 
                                                        primary={product.title} 
                                                        secondary={product.category}
                                                    />
                                                    <ListItemText 
                                                        primary={product.basePrice+"€"} 
                                                        secondary={"+" + product.shipping.toFixed(2) + "€"}
                                                    />
                                                </Stack>
                                            </ListItemButton>
                                        </Stack>
                                    </Box>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>

                :   
                <Box padding={3}>
                    <Stack spacing={1} alignItems={'center'}>
                        <Typography>You dont have any favorite products.</Typography>
                        <Button color="secondary" variant="contained" onClick={()=> window.location.href="../feed/products"}>explore products</Button>
                    </Stack>
                </Box>
               
                }
                
            </Container>
        </>
    )
}

export default Favorite
