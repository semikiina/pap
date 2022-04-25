import { CircularProgress, Container, Typography, Stack, Paper, Divider, Box, TextField, Grid, Button, InputLabel, Input, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProfileEdit from './Profile Edit/ProfileEdit';


const Profile = ({user, setUser}) => {

    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    if(!user) return <CircularProgress/>
    return (
        <>
            <Container>
                <Stack direction="row" spacing={4}>
                    <Paper >
                        <Stack justifyContent={'center'} alignItems={'center'} padding={2}>
                            <Typography padding={2}>Welcome back, {user.first_name}</Typography>
                            <Avatar  alt={user.nickname} src="https://static8.depositphotos.com/1003924/886/i/600/depositphotos_8868243-stock-photo-spectrum-multicolored-eye-macro.jpg" sx={{ width: 200, height: 200 }}></Avatar>
                            <Button  variant="outlined" color="secondary" onClick={handleOpen} >Edit Profile</Button>
                        </Stack>
                    </Paper>
                    <Paper>
                        <Typography padding={2} variant="h6">Your adresses</Typography>
                        <Divider></Divider>
                        <Box padding={2}>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                {user && <TextField id="outlined-basic" label="Last name" variant="outlined" defaultValue={user.first_name} fullWidth/>}
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField id="outlined-basic" label="Last name" variant="outlined" defaultValue={user.last_name} fullWidth/>
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth/>
                                </Grid>
                            </Grid>
                            
                        </Box>
                    </Paper>
                </Stack>
                
            </Container>
            <ProfileEdit open={open} handleClose={handleClose} user={user} setUser={setUser} setAvatar={setAvatar}/>
        </>
    )
}

export default Profile
