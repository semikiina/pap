import React, { useEffect, useState } from 'react'
import { Stack, Typography, Box, Divider, Avatar, Rating, ListItemText, ListItem, ListItemAvatar, ListItemButton, IconButton} from '@mui/material'
import { StarBorder} from '@mui/icons-material';
import api from '../../../../Services/api';
import { Lightbox } from "react-modal-image";

const StoreReviews = ({storeid}) => {

    const [reviews, setReviews] = useState([]);
    const [avgRev, setAvgRev] = useState(0);
    const [open, setOpen] = useState();

    useEffect(()=>{

        api.get('review/store/'+storeid)
        .then(data=>{
            setReviews(data.data.revArray)

            var avg=0;
            data.data?.revArray?.forEach((rev)=>{
                avg += rev.review
            })

            avg= avg/data.data?.revArray?.length;
            setAvgRev(avg)
        })
        .catch(err =>{
            console.log(err)
        })

    },[])

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if(!reviews.length) return <Typography textAlign={'center'}>This store doesn't have any reviews yet.</Typography>

    return (
        <>
            <Stack padding={2} alignItems="center" direction="row" spacing={3}>
                <Rating readOnly value={avgRev} />
                <Typography variant="h6">{reviews.length} reviews</Typography>
            </Stack>
            <Divider ></Divider>
            {
                reviews?.map((rev)=> {
                    return (
                        <Box key={rev._id}>
                        <Box padding={2} marginBottom={3} >
                            <ListItem dense disablePadding>
                                <ListItemAvatar>
                                    <Avatar src={`http://localhost:8090/${rev.user_id.profile_pic}`} />
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={`${rev.user_id.first_name} ${rev.user_id.last_name}`}
                                    secondary={`@${rev.user_id.nickname}`}
                                />
                            </ListItem>
                            <ListItemButton  disableRipple disabled={!rev.product_id.active} onClick={()=> window.location.href="../products/"+rev.product_id._id}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar src={`http://localhost:8090/${rev.product_id.images[0]}`} variant="square" sx={{ width: 80, height: 80 }} />
                                    <Box fullWidth>
                                        <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                                            <ListItemText 
                                                primary={rev.product_id.title}
                                                secondary={rev.product_id.category}
                                            />
                                        </Stack>
                                        <Typography variant="subtitle2">{rev.description}</Typography>
                                    </Box>
                                </Stack>
                            </ListItemButton>
                            {
                                rev.images &&
                                <Stack direction="row" spacing={2}>
                                    { 
                                        rev.images?.map((img,index)=>{
                                            var imgInd = rev._id+index;
                                            return <Box key={imgInd}>
                                                <IconButton onClick={()=>setOpen(rev._id+index)} disableRipple>
                                                    <Avatar src={`http://localhost:8090/${img}`} variant={'square'} sx={{width:100, height:100}} />
                                                </IconButton>
                                                {
                                                    open == imgInd && 
                                                        <Lightbox
                                                        medium={`http://localhost:8090/${img}`}
                                                        onClose={()=>setOpen("")}
                                                        />
                                                    
                                                }
                                            </Box>
                                                        
                                        })
                                    }
                                </Stack>
                            }
                            {
                               !rev.product_id.active && <Typography variant="subtitle2" color="error" textAlign={'center'}>This product isn't available now.</Typography> 
                            }
                            
                            <Stack direction="row"  marginBottom={1} justifyContent="flex-end" alignItems={'flex-end'}>
                                <Rating value={rev.review} readOnly/>
                                <Typography variant="caption" > , {new Date(rev.date_created).toLocaleDateString("en-US", options)}</Typography>
                            </Stack>
                        </Box>
                        <Divider variant="middle" />
                        </Box>
                    )
                })
            }
            
        </>
    )
}

export default StoreReviews
