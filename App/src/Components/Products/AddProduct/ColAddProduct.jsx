import { Box, Divider, Paper, Typography, TextField, Grid, FormControlLabel, Checkbox } from '@mui/material'
import React from 'react'

const ColAddProduct = () => {
    return (
        <>
        <Box marginBottom={4}>
            <Paper >
                <Typography variant="subtitle1" padding={2}>Details</Typography>
                <Divider></Divider>
                <Grid padding={2} container spacing={2} >
                    <Grid item xs={12} md={6} marginBottom={2}>
                        <TextField helperText="This should be a short answer." id="demo-helper-text-misaligned" label="Title" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6} marginBottom={2}>
                        <TextField  id="demo-helper-text-misaligned" label="Stock" type="number" fullWidth />
                    </Grid>
                    <Grid item xs={12} marginBottom={2}>
                        <TextField  id="demo-helper-text-misaligned" label="Description"  fullWidth />
                    </Grid>
                    
                </Grid>
            </Paper>
        </Box>
        <Box marginBottom={4}>
            <Paper >
                <Typography variant="subtitle1" padding={2}>Price</Typography>
                <Divider></Divider>
                <Grid padding={2} container spacing={2} >
                    <Grid item xs={12}  marginBottom={2}>
                        <TextField  id="demo-helper-text-misaligned" label="Price" type="number" fullWidth />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
        <Box marginBottom={4}>
            <Paper >
                <Typography variant="subtitle1" padding={2}>Variants</Typography>
                <Divider></Divider>
                <Grid padding={2} container spacing={2} >
                    <Grid item xs={12}  marginBottom={2}>
                        <TextField  id="demo-helper-text-misaligned" label="Price" type="number" fullWidth />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
        <Box marginBottom={4}>
            <Paper >
                <Typography variant="subtitle1" padding={2}>Shipping Options</Typography>
                <Divider></Divider>
                <Grid padding={2} container spacing={2} >
                    <Grid item xs={12}  >
                        <TextField  id="demo-helper-text-misaligned" label="Shipping price" type="number" fullWidth />
                    </Grid>
                    <Grid item xs={12}  marginBottom={2}>
                        <FormControlLabel control={<Checkbox  />} label="Free shipping" />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
        <Box marginBottom={4}>
            <Paper >
                <Typography variant="subtitle1" id="details" padding={2}>Media Upload</Typography>
                <Divider></Divider>
                <Grid padding={2} container spacing={2} >
                    <Grid item xs={12}  >
                        <TextField  id="demo-helper-text-misaligned" label="Media Upload" type="number" fullWidth />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
        </>
    )
}

export default ColAddProduct
