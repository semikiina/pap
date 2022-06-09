import { Box, CardMedia, Stack } from '@mui/material';
import React from 'react'

const ProductImages = ({ChangedPhoto, currentPhoto, images}) => {


    return (
            <Box>
                <CardMedia
                component="img"
                sx={{objectFit:'cover', maxHeight:550, maxWidth:550, minHeight:100, minWidth:100 }}
                image={"http://localhost:8090/" + currentPhoto} 
                />
                <Stack direction="row" spacing={2} marginTop={2} alignItems={'center'}>
                    {
                        images?.map((e, i) => {
                           
                            return ( <CardMedia
                                key={i}
                                component="img"
                                sx={{ width: 80, height: 80 }}
                                image={"http://localhost:8090/" + e} 
                                onClick={()=> {ChangedPhoto(e)}}
                            />
                            )
                        })
                    }
                </Stack>
        </Box>  
    )
}

export default ProductImages
