import React from 'react'
import { MenuItem, Menu, Typography, CircularProgress, Stack, Avatar, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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
                        <AddShoppingCartIcon></AddShoppingCartIcon>
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
            >
                {cart.items && cart.items.map((item) => (
                    <MenuItem key={item.product_id._id}  >
                        <Stack direction="row" alignItems={'center'} spacing={1} justifyContent={"space-between"} >
                            <CloseIcon onClick={()=>onRemoveFromCart(item.product_id._id)}></CloseIcon>
                            <Stack direction="row" alignItems={'center'} spacing={1}  >
                                <Avatar variant="square" src={'http://localhost:8090/'+item.product_id.images[0]}></Avatar>
                                <Stack>
                                    <Typography variant="subtitle2">{item.product_id.title}</Typography>
                                    <Stack direction="row" justifyContent={"space-between"} >
                                        <Typography variant="caption">Qtt.{item.quantity}</Typography>
                                        <Typography variant="caption">{item.product_id.price} €</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            
                        </Stack>
                    </MenuItem>
                ))}
                <Stack direction="row" justifyContent="space-between" paddingX={2} paddingTop={1}>
                    <Typography>Subtotal:</Typography>  
                    <Typography>{cart.subtotal} €</Typography>  
                </Stack>
                     
                <MenuItem onClick={handleCloseCartMenu}>
                    <Button fullWidth variant="contained" color="secondary" onClick={()=> window.location.href="./cart"}>Go to Cart</Button>   
                </MenuItem>
            </Menu>
        </>
    )
}

export default CartMenu
