import React, { useState } from 'react'
import {ImageList, ImageListItem, ImageListItemBar, CircularProgress, Stack, Button,Select, MenuItem, Typography} from '@mui/material'

const StoreProduct = ({product}) => {

    const seeProduct = (e)=>{
        window.location.href="../products/"+e
    }
  

    if (!product) return <CircularProgress/>;
    return (
        <>
        
            <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} rowHeight={'auto'} >
                {
                    product.map((item) =>{
                        return (
                            <ImageListItem key={item._id}>
                            <img
                                src={'https://tagmeapi.herokuapp.com/'+item.images[0]}
                                alt={item.title}
                                style={{ maxHeight:267}}
                                loading="lazy"
                                onClick={()=>{seeProduct(item._id)}}
                            />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={<span>{item.basePrice} €</span>}
                                position="below"
                            />
                            </ImageListItem>
                        )
                    } )
                }
            </ImageList>
        </>
    )
}

export default StoreProduct
