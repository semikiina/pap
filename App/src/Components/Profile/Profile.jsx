import React from 'react'
import {Container, Paper, Stack, Typography, Box, Tab, Divider, Avatar, Grid} from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {FavoriteBorder, BookmarkBorder, StarBorder} from '@mui/icons-material';


const Profile = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Container>
                <Grid container spacing={3}>
                    <Grid item md={4} lg={3}>
                        <Box>
                            <Paper>
                                <Typography padding={2} align={'center'}>Store Name</Typography>
                                <img src="https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?w=2000" alt="profile" width="200" height="200"></img>

                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item md={8} lg={9}>
                        <Box fullWidth>
                            <Paper>
                                <Typography padding={2}>Reviews | 543</Typography>
                                <Divider marginBottom={3}></Divider>
                                <Box padding={2} marginBottom={3}>
                                    <Stack direction="row" spacing={2}>
                                        <Avatar variant="square" sx={{ width: 80, height: 80 }}>R</Avatar>
                                        <Box>
                                            <Typography variant="subtitle1">Title of product</Typography>
                                            <Typography variant="subtitle2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row"  marginBottom={1} justifyContent="flex-end">
                                        <StarBorder/>
                                        <StarBorder/>
                                        <StarBorder/>
                                        <StarBorder/>
                                        <StarBorder/>
                                        <Typography variant="subtitle1" > 18/07/2004</Typography>
                                     </Stack>
                                </Box>
                                <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Store Reviews" value="1" fullWidth/>
            <Tab label="Item Two" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
                            </Paper>
                        </Box>
                    </Grid>
                    
                   
                </Grid>
                
            </Container>
        </>
    )
}

export default Profile
