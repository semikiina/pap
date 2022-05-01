import React from 'react'
import { Stack, Typography, Box, Divider, Avatar,Rating, Checkbox, Button, IconButton} from '@mui/material'
import { Favorite, FavoriteBorder, StarBorder, Edit, Delete} from '@mui/icons-material';
import api from '../../../Services/api';

const ProductReview = ({id,reviews,setDel,del}) => {

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const DeleteReview = (delid)=>{
        api.delete('review/'+delid)
        .then(res =>{
            setDel(del +1)
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
 
    if(!reviews.length) return (

        <Stack alignItems={'center'} marginTop={4}>
            <StarBorder sx={{width:50, height:50}}></StarBorder>
            <Typography>This product doesn't have any reviews yet!</Typography>
        </Stack>
        
    )
    
    return (
        <>
            <Typography variant="h5"  marginTop={4} >Reviews</Typography>
            <Divider ></Divider>
                {
                    reviews.map((rev)=>{
                        return(
                            <Box padding={2} marginBottom={3} key={rev._id}>
                                <Stack direction="row" spacing={2} marginBottom={2}>
                                    <Avatar src={'http://localhost:8090/'+rev.user_id.profile_pic}></Avatar>
                                    <Box>
                                        <Stack direction="row" spacing={1} >
                                            <Typography variant="subtitle1">{rev.user_id.first_name+" "+rev.user_id.last_name}</Typography>
                                            <Rating value={rev.review} readOnly />
                                        </Stack>
                                        <Typography variant="caption">@{rev.user_id.nickname}</Typography>
                                    </Box>
                                    
                                </Stack>
                                <Box>
                                    <Typography variant="subtitle2">{rev.description}</Typography>
                                </Box>
                                <Box>
                                    {/* Its for images */}
                                </Box>
                                <Stack direction="row"  marginBottom={1} justifyContent="space-between" >
                                    <Stack direction="row" spacing={1}  justifyContent="flex-end" alignItems={'center'}>
                                        <IconButton onClick={()=>DeleteReview(rev._id)}>
                                            <Delete color="error"/>
                                        </IconButton>
                                        
                                    </Stack>
                                    <Stack direction="row" justifyContent="flex-end" alignItems={'center'}>
                                        <Typography>{rev.favorites.length}</Typography>
                                        <Checkbox
                                            icon={<FavoriteBorder />}
                                            checkedIcon={<Favorite />}
                                            color="error"
                                        />
                                        <Typography variant="subtitle2" >  { new Date(rev.date_created).toLocaleDateString("en-US",options)}</Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                        )
                    })
                }     
        </>
  )
}

export default ProductReview
