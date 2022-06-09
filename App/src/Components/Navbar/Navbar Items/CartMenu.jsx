import React from 'react'
import { MenuItem, Menu, Typography, ButtonGroup, Stack, Avatar, Button, Divider, ListItem, ListItemText, ListItemIcon, ListItemAvatar, List, ListItemButton, IconButton, Tooltip} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {AddShoppingCart , Delete} from '@mui/icons-material';
import { Box } from '@mui/system';

const CartMenu = ({cart,handleCloseCartMenu,anchorElCart,onRemoveFromCart, onRemoveQuantity, onAddToCart}) => {

    if(!cart.items) return null

    if(cart.items.length ==0) return <Menu
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
                    var ItemQuantity = item.product_id.variants?.prices.find((i) => i.skuid == item.skuid).availableQuantity;
                    return(
                        <Box key={item.product_id._id+index}>
                        <Stack direction="row" alignItems={'center'}>
                            <ListItem 
                                disabled={!item.product_id.active}
                            >
                                <ListItemAvatar>
                                <Avatar src={'http://localhost:8090/'+item.product_id.images[0]} sx={{width:80, height:80 }} variant="square"/>
                                </ListItemAvatar>
                                <Stack sx={{pl:2}}>
                                    <ListItemText primary={item.product_id.title} secondary={`${item.skuid?.replaceAll("?", ", ")}`} />
                                    {
                                        item.product_id.active &&
                                        <ButtonGroup  disableElevation >
                                            <Button size="small" variant="contained" color="secondary" disabled={item.quantity>1 ? false : true } onClick={()=>onRemoveQuantity(item.product_id._id, item.skuid)}>-</Button>
                                            <Button size="small" disabled>{item.quantity}</Button>
                                            <Button size="small" variant="contained" color="secondary" disabled={item.quantity < ItemQuantity ? false : true } onClick={()=>onAddToCart(item.product_id._id, 1, item.skuid)}>+</Button>
                                        </ButtonGroup>
                                    }
                                </Stack>
                                <Box marginLeft={2} edge="end">
                                    <ListItemText 
                                        primary={item.price+" €"}
                                        secondary={`+${item.product_id.shipping.toFixed(2)}€`}
                                    />
                                </Box>
                            </ListItem>
                            <IconButton edge="end" aria-label="delete" onClick={()=>onRemoveFromCart(item.product_id._id, item.skuid)} sx={{mr:3}} >
                                <Tooltip title="remove">
                                    <Delete edge="end" />
                                </Tooltip>
                            </IconButton>
                        </Stack>
                        
                        {
                            !item.product_id.active && <Typography variant="subtitle2" color="error" textAlign={'center'}>This product isn't available now.</Typography>
                        }
                        </Box>
                )})}
                </List>
                <Divider variant="middle" />
                <Box padding={2}>
                    <Typography variant="subtitle2">Shipping : {cart.shipping}€</Typography>
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
