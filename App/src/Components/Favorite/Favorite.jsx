import { CircularProgress, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Container, Stack, Divider } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../Services/api';

const Favorite = ({favorite}) => {
    
    const [hover, setHover] = useState(null);
    const [fav, setFav] = useState(false);
    const newFavorite = (id) =>{
        api.post('user/nfav/620ac00c85d485580493d87f/'+id)
        .then(({data})=>{
            console.log(data.fav)
            if(data.fav)setFav(true)
            else setFav(false)
        })
        
    }

    if(!favorite) return <CircularProgress/>
    return (
        <>
            <Container>
                <Typography variant="h5" padding={2}>My wishlist</Typography>
                <Divider></Divider>
                <Grid container spacing={3} marginTop={1}>
                    {favorite.map((product)=>{
                        
                        return(
                            <Grid item key={product._id} sm={12} md={6} lg={3} >
                                <Card sx={{ maxWidth: 345 }} onMouseOver={()=>setHover(product._id) } onMouseOut={()=>setHover(null)} >
                                <Button href={'products/'+ product._id} padding={0} >
                                    <CardMedia
                                    component="img"
                                    height="300"
                                    image={"http://localhost:8090/" + product.images[0]} 
                                    alt={product.title} 
                                    />
                                </Button>
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle2" component="div">
                                    {product.title} 
                                    </Typography>
                                    <Stack direction="row" justifyContent={'space-between'}>
                                        <Typography  variant="subtitle1" component="div">
                                        {product.price} € 
                                        </Typography>
                                        {
                                            hover === product._id && <DeleteIcon size="small" onClick={()=>newFavorite(product._id)}></DeleteIcon>
                                        }
                                    </Stack>
                                    
                                </CardContent>
                                
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
