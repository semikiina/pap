import { Container, Stack, Paper, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Box } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom';
import api from '../../../Services/api';
import useAuth from '../../Contexts/useAuth';

const ConfirmInvite = () => {

    const {user} = useAuth();

    console.log(user)
    const {id} = useParams();

    const ConfirmInvite = () => {
        api.post('store/confirmInvite/'+id)
        .then(data => {
            localStorage.setItem('SAuthorization', data.data.stoken)
            window.location.href="../"
        })
        .catch(err=> console.log(err))
    }
    return (
        <Container>
            <Stack alignItems={'center'} justifyContent={'center'} sx={{height : "100%"}} >
                <Paper sx={{minWidth:300}}>
                    <Box padding={2}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={`http://localhost:8090/`+user.profile_pic} />
                            </ListItemAvatar>
                            <ListItemText
                                primary="You're logged in as"
                                secondary={"@"+user.nickname}
                            />
                        </ListItem>
                        <Button onClick={ConfirmInvite} fullWidth variant="outlined">Join the crew!</Button>
                    </Box>
                </Paper>
            </Stack>
        </Container>
    )
}

export default ConfirmInvite
