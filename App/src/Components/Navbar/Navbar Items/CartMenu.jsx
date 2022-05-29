import React from 'react'
import { MenuItem, Menu, Typography, CircularProgress, Stack, Avatar, Button, Divider, ListItem, ListItemText, ListItemIcon, ListItemAvatar, List, ListItemButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {AddShoppingCart , Delete} from '@mui/icons-material';
import { Box } from '@mui/system';

const CartMenu = ({cart,handleCloseCartMenu,anchorElCart,onRemoveFromCart}) => {
    if(!cart.items) return <CircularProgress></CircularProgress>
    if(cart.items.length ==0) 
    return <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElCart}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(anchorElCart)}
                onClose={handleCloseCartMenu}
            >
                <MenuItem onClick={()=>{window.location.href="./" ;handleCloseCartMenu()}}>
                    <Stack alignItems={'center'} fontSize="large">
                        <AddShoppingCart/>
                        <Typography>Your shopping cart is empty.</Typography>  
                        <Typography variant="subtitle2">Start by adding a product.</Typography>  
                    </Stack>
                    
                </MenuItem>
        </Menu>
    return (
        <>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElCart}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElCart)}
                onClose={handleCloseCartMenu}
                PaperProps={{
                    style: {
                      maxHeight: 500,
                    },
                  }}
            >
                <List>
                {cart.items && cart.items.map((item,index) => {
                    return(
                    <ListItem key={item.product_id._id+index} divider >
                        <ListItemButton >
                            <ListItemIcon><Delete edge="start" color="error" onClick={()=>onRemoveFromCart(item.product_id._id, item.skuid)}/></ListItemIcon>
                            <ListItemAvatar>
                                <Avatar src={'https://tagmeapi.herokuapp.com/'+item.product_id.images[0]} sx={{width:50, height:50, objectFit: 'cover'}} variant="square" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.product_id.title}
                                secondary={
                                    <Stack spacing={1}  component="span">
                                        {item.product_id.category}
                                        <br/>
                                            Qtt. {item.quantity}
                                            <Typography variant="caption">{item.skuid?.replaceAll("?", ", ")}</Typography>
                                    </Stack>
                                }
                            />
                            <Box marginLeft={2} edge="end">
                                <Typography>{item.price+" €"}</Typography>
                            </Box>
                        </ListItemButton>
                    </ListItem>
                )})}
                </List>
                <Box padding={2}>
                    <Typography >Shipping : {cart.shipping}€</Typography>
                    <Typography >Subtotal : {cart.subtotal}€</Typography>
                </Box>
                <MenuItem onClick={handleCloseCartMenu}>
                    <Button fullWidth variant="contained" color="secondary" onClick={()=> window.location.href="../cart"}>Go to Cart</Button>   
                </MenuItem>
            </Menu>
        </>
    )
}

export default CartMenu
