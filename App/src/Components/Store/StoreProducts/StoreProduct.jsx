import React, { useEffect, useState } from 'react'
import {ImageList, ImageListItem, ImageListItemBar, CircularProgress} from '@mui/material'

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
                        console.log(item)
                        return (
                            <ImageListItem key={item._id}>
                            <img
                                src={'http://localhost:8090/'+item.images[0]}
                                alt={item.title}
                                loading="lazy"
                                onClick={()=>{seeProduct(item._id)}}
                            />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={<span>{item.price} €</span>}
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
