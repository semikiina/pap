import { Container, Divider, Grid, Typography, Paper, TextField, Stack, Button, Box, Stepper, Step, StepLabel } from '@mui/material'
import React , {useState} from 'react'

const BasicInfos = () => {
  return (
    <Paper elevation={6}>
        <Stack padding={2} spacing={2}>
            <Typography textAlign={'center'} variant="h6">Let's start with some basic informations</Typography>
            <TextField label="Store Name" fullWidth></TextField>
            <TextField label="Store Email" fullWidth></TextField>
            <Button variant="contained"> Continue</Button>
        </Stack>
    </Paper>
  )
}

export default BasicInfos
