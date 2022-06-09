import React from 'react'
import { Card, CardContent, Button, Typography, Box, Avatar, Stack, CardHeader, Grid, ListItemButton, IconButton } from '@mui/material';
import { Inventory } from '@mui/icons-material';

const CarousselitemStores = ({store}) => {
    return (
        <Box padding={1}>
            <Card >
                <ListItemButton onClick={() => window.location.href="../store/"+store._id}>
                    <CardHeader  
                        sx={{ padding: 1}}
                        title={store.store_name}
                        avatar={ <Avatar variant="square" src={'http://localhost:8090/'+store.store_image} /> }
                        />
                </ListItemButton>
                
                <CardContent >
                    <Grid container spacing={1}>
                        {
                            store.product.length 
                            ?   store.product.map((product) =>{
                                    return <Grid item sm={12} md={6} key={product._id}>
                                        <IconButton disableRipple onClick={() => window.location.href="../products/"+product._id}>
                                            <Avatar  sx={{width : 100 , height : 100}}  variant="square" src={'http://localhost:8090/'+ product.images[0]}/>
                                        </IconButton>
                                    </Grid>
                                })
                            :   <Stack justifyContent={'center'} alignItems="center" padding={2} spacing={1}>
                                    <Inventory color="text.secondary" sx={{width:35, height:35}}/>
                                    <Typography variant="subtitle2" textAlign={'center'}>This store doesn't have any products yet.</Typography>
                                </Stack>

                        }
                    </Grid>
                </CardContent>
            </Card>
        </Box>
       
    )
}

export default CarousselitemStores
