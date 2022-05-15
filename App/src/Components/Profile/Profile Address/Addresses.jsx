import { Stack, Paper, Grid, ListItem, List, ListItemText} from '@mui/material'
import React from 'react'
import useAuth from '../../Contexts/useAuth'
import { Delete } from '@mui/icons-material';

const Addresses = ({DeleteAddress}) => {

    const {user} = useAuth();

    return (
        <Grid container spacing={4} padding={2}>
            { user.addresses?.map((item)=>{
                return <Grid item sm={6} key={item._id}>
                    <Paper>
                        <Stack spacing={2} padding={2}>
                        <List>
                            <Stack direction="row" justifyContent={'flex-end'} spacing={1}>
                                <Delete color="error" onClick={()=> DeleteAddress(item._id)}/>
                            </Stack>
                            <ListItem>
                                <ListItemText primary="Name" secondary={item.first_name + ' ' + item.last_name}></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Email" secondary={item.email}></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Phone" secondary={item.phone_code + " " + item.phone}></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Address 1" secondary={item.address_1+ ", " + item.zip_code + " " + item.province + ", " + item.city + ", " + item.country}></ListItemText>
                            </ListItem>
                            {item.address_2 &&
                                <ListItem>
                                    <ListItemText primary="Address 2" secondary={item.address_2}></ListItemText>
                                </ListItem>
                            }
                        </List>
                        </Stack>
                    </Paper>
                </Grid>
            })}
        </Grid>
  )
}

export default Addresses
