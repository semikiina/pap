import React from 'react'
import { Stack, Typography, Box, Divider, Avatar} from '@mui/material'
import { StarBorder} from '@mui/icons-material';

const ProductReview = () => {

    
    return (
        <>
            <Typography variant="h5"  marginTop={4} >Reviews</Typography>
            <Divider ></Divider>
            <Box padding={2} marginBottom={3}>
                <Stack direction="row" spacing={2}>
                    <Avatar variant="square" sx={{ width: 80, height: 80 }}>R</Avatar>
                    <Box>
                        <Typography variant="subtitle1">Title of product</Typography>
                        <Typography variant="subtitle2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Typography>
                    </Box>
                </Stack>
                <Box>
                    {/* Its for images */}
                </Box>
                <Stack direction="row"  marginBottom={1} justifyContent="flex-end" alignItems={'flex-end'}>
                    <StarBorder/>
                    <StarBorder/>
                    <StarBorder/>
                    <StarBorder/>
                    <StarBorder/>
                    <Typography variant="caption" > , 18/07/2004</Typography>
                </Stack>
            </Box>
        </>
  )
}

export default ProductReview
