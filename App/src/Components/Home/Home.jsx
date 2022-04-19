import React from 'react'
import {Stack, Typography, Toolbar, Container, Button} from '@mui/material';

const home = () => {
  return (
    <Container>
        <Stack direction="row" marginBottom={4}>
            <Typography variant="h2" margin={2}>Tag Me</Typography>
            <img src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?cs=srgb&dl=pexels-pixabay-39866.jpg&fm=jpg" alt="cat-meme" height={500}></img>
        </Stack>
        <Button fullWidth variant='contained' href="/category">Search products</Button>
    </Container>
  )
}

export default home
