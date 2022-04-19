import { Container, Grid, Box, Paper, Button, Typography, Divider, FormControlLabel, Switch } from '@mui/material'
import React from 'react'
import ColAddProduct from './AddProduct/ColAddProduct'

const AddProducts = () => {
    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} >
                        <ColAddProduct></ColAddProduct>
                    </Grid>
                    <Grid item xs={12} md={4} >
                        <Box marginBottom={4}>
                            <Paper >
                                <Box padding={2}>
                                    <Button padding={2} variant="contained" fullWidth>Save Changes</Button>
                                </Box>
                                <Box padding={2}>
                                    <FormControlLabel control={<Switch defaultChecked />} label="Active Product" />
                                </Box>
                                
                            </Paper>
                        </Box>
                        <Box marginBottom={4}>
                            <Paper >
                                <Typography variant="subtitle1" padding={2}>Categorys</Typography>
                                <Divider></Divider>
                                <Box padding={2}>
                                    <Button padding={2} color="primary" fullWidth>Edit Categorys</Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            
        </>
    )
}

export default AddProducts
