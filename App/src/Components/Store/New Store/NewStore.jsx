import { Container, Divider, Grid, Typography, Paper, TextField, Stack, Button } from '@mui/material'
import React from 'react'

const NewStore = () => {
  return (
    <Container>
        <Typography padding={2} variant="h5">Create a new Store</Typography>
        <Divider/>
      <Grid container spacing={2} marginTop={3}>
        <Grid item sx={12} md={6}>
            <Paper elevation={6}>
                <Stack padding={2} spacing={2}>
                    <Typography textAlign={'center'} variant="h6">Let's start with some basic informations</Typography>
                    <TextField label="Store Name" fullWidth></TextField>
                    <TextField label="Store Email" fullWidth></TextField>
                    <Button variant="contained"> Continue</Button>
                </Stack>
            </Paper>
        </Grid>
        <Grid item sx={12} md={6}></Grid>
      </Grid>
    </Container>
  )
}

export default NewStore
