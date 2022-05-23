import { Collapse, Divider, Paper, Typography, Alert , Button, Box, Stack} from '@mui/material'
import React, { useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone';

const Step3 = ({handleNext, handleBack, setImages}) => {

    const[ error, setError] = useState(false)
    const[ prImages, setPrImages] = useState()

    const verifyImages = () =>{
        if( prImages.length < 1) setError(true)
        else {
            setImages(prImages)
            handleNext();
        }

    }

  return (
    <Paper>
        <Typography padding={2}>Media Upload</Typography>
        <Divider />
        <Box paddingY={2}><Collapse in={error}><Alert severity="error" onClose={() => {setError(false)}}>You need to add at least 1 image!</Alert></Collapse></Box>
        
        <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click here."}
            onChange={(files) => setPrImages(files)}
            filesLimit={6}
        />
        <Box padding={2}>
            <Stack direction="row" justifyContent={'flex-end'}>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={verifyImages}>Next</Button>
            </Stack>
        </Box>
    </Paper>
  )
}

export default Step3
