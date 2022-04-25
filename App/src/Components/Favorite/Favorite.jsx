import { CircularProgress, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Container } from '@mui/material'
import React from 'react'

const Favorite = ({favorite}) => {
    
    if(!favorite) return <CircularProgress/>
    return (
        <>
            <Container>
                <Grid container spacing={3}>
                    {favorite.map((product)=>{
                        
                        return(
                            <Grid item key={product._id} sm={12} md={6} lg={4}>
                                <Card sx={{ maxWidth: 345 }}  >
                                <Button href={'products/'+ product._id} padding={0} >
                                    <CardMedia
                                    component="img"
                                    height="400"
                                    image={"http://localhost:8090/" + product.images[0]} 
                                    alt={product.title} 
                                    />
                                </Button>
                                
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                    {product.category}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                    {product.title} 
                                    </Typography>
                                    <Typography  variant="h6" component="div">
                                    {product.price} € 
                                    </Typography>
                                
                                </CardContent>
                                <CardActions >
                                        <Button size="large" variant="outlined" color="secondary" fullWidth >Add to Cart</Button>          
                                </CardActions>
                                </Card>
                            </Grid>
                            )
                    })}
                </Grid>
            </Container>
        </>
    )
}

export default Favorite
