import React, { useState } from 'react'
import { Stack, Typography, Box, Divider, Avatar,Rating, IconButton, Select, MenuItem, InputLabel, FormControl, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { StarBorder, Delete} from '@mui/icons-material';
import api from '../../../Services/api';
import useAuth from "../../Contexts/useAuth";
import RevPagination from './Footer/Reviews/RevPagination';
import { Lightbox } from "react-modal-image";

const ProductReview = ({ reviews,setDel,del}) => {

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var { user} = useAuth();

    const [currentPage, setCurrentPage] = useState(1);
    const [revPerPage, setRevPerPage] = useState(5);
    const [open, setOpen] = useState();

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

    const indexOfLastRev = currentPage * revPerPage;
    const indexOfFirstRev =  indexOfLastRev - revPerPage;
    const currentRevs = reviews.slice(indexOfFirstRev,indexOfLastRev);

    const handlePaginationChange = (e, page) => {
        setCurrentPage(page)
    }

    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} margin={2}>
                <Typography variant="h5" >Reviews</Typography>
                <Box>
                    <FormControl >
                        <InputLabel id="revPagelabel">Items</InputLabel>
                        <Select defaultValue={revPerPage} onChange={(e) => setRevPerPage(e.target.value)} labelId="revPagelabel"  label="Items" sx={{width: 80}}>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>15</MenuItem>
                        </Select> 
                    </FormControl>
                </Box>
            </Stack>
            <Divider ></Divider>
                {
                    currentRevs.map((rev)=>{
                        return(
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
                            <Typography variant="subtitle2" padding={1} >{rev.description}</Typography>
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
                            <Stack direction="row"  marginBottom={1} justifyContent="flex-end" alignItems={'center'}>
                                <Rating value={rev.review} readOnly/>
                                <Typography variant="caption" > , {new Date(rev.date_created).toLocaleDateString("en-US", options)}</Typography>
                                {
                                    user._id == rev.user_id._id && 
                                    <IconButton onClick={()=>DeleteReview(rev._id)} >
                                        <Delete color="error" />
                                    </IconButton>
                                }
                            </Stack>
                        </Box>
                        <Divider variant="middle" />
                        </Box>
                        )
                    })
                }
                <Box marginTop={3}>
                    <RevPagination revPerPage={revPerPage} totalRevs={reviews.length} currentPage={currentPage} handlePaginationChange={handlePaginationChange} />     
                </Box>
            
        </>
  )
}

export default ProductReview
