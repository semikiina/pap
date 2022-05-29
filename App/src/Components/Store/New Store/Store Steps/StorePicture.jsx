import { Avatar, Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState, useRef } from 'react'
import { ArrowBack} from '@mui/icons-material';
import api from '../../../../Services/api'

const StorePicture = ({handleBack, setLoading,handleNext, newStore}) => {

    const [ava, setAva] = useState('');
    const inputFile = useRef(null);

    const onButtonClick = () => {
       inputFile.current.click();
    };

    const handleChange = event => {

        var file = event.target.files[0];
        var url =  URL.createObjectURL(file);
        setAva(url)
    }
    const createStore = () =>{

        setLoading(true)

        var imagefile = document.querySelector('#file');
  
        console.log(newStore)
        var formdata = new FormData();
        if(imagefile.files[0])
        formdata.append('image', imagefile.files[0])
        formdata.append('store_name', newStore.store_name)
        formdata.append('store_email', newStore.store_email)

        api.post('store',formdata,{
            headers: {
                'Content-Type': 'multipart/form-data'
                }
        })
        .then(data =>{

            setLoading(false)
            handleNext()
        })
        .catch(err=>{
            setLoading(false)
            console.log(err)
        })

    }

    return (
        <>
            <Box>
                <ArrowBack onClick={handleBack}/>
            </Box>
            <Typography textAlign={'center'}>Add a store picture</Typography>
            <Stack alignItems={'center'} spacing={1} >
                <Avatar variant="square" src={ava} onClick={onButtonClick}  sx={{ width: 200, height: 200}}>{newStore.store_name}</Avatar>
                <Typography>{newStore.store_name}</Typography>
            </Stack>
            <input  id="file" type="file" ref={inputFile} onChange={(e) => handleChange(e)} hidden></input>
            <Stack direction="row" justifyContent={'flex-end'} spacing={1} paddingTop={3}>
                <Button variant="contained" onClick={createStore}>next</Button>
            </Stack>
        </>
    )
}

export default StorePicture
