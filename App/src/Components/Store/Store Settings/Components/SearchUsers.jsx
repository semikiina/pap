import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Button, Autocomplete, TextField, Stack, ListItemText, TextareaAutosize, Typography, Box, Grid, Select, MenuItem, InputLabel, FormControl, IconButton, Divider, Collapse, Alert } from '@mui/material'
import api from '../../../../Services/api';
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import { DropzoneArea } from 'material-ui-dropzone';
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Close } from '@mui/icons-material';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana',];

const schema = yup.object({
    email: yup.string().email().required(),
    role: yup.number().required()
   })

const SearchUsers = ({open, handleClose, emails}) => {

    const [error, setError] = useState({});

    const { handleSubmit, register, formState:{ errors } , setValue } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(()=>{
        setValue('role', 2)
    },[])


    const onSubmit = (data) => {

        setError({active:false})
        if(!emails.includes(data.email))
        { 
           api.post('store/inviteCollaborator', data)
            .then(data => {
                handleClose();
            })
            .catch(err=> console.log(err))
        }
        else {
            setError({message:"This email already is in Collaborators list.", active:true})
        }
    }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={'paper'}
        fullWidth
    
        
    >
        
        <DialogTitle > 
            <Stack direction="row" justifyContent="space-between" alignItems={'center'} >
                <Typography variant="h6">Invite new collaborators to your store</Typography>
                <IconButton onClick={handleClose}>
                    <Close/>
                </IconButton>
            </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent  >
            <form onSubmit={handleSubmit(onSubmit)} >
                <Stack spacing={3} marginTop={1} >
                    <Grid container spacing={3}>
                        <Grid item xs={8}><TextField type="email" label="Collaborator email" fullWidth required {...register('email')} /></Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="roleid">Role *</InputLabel>
                                <Select
                                    labelId="roleid"
                                    label="Role *"
                                    defaultValue={2}
                                    onChange={(e)=> setValue('role', e.target.value)}
                                >
                                    <MenuItem value={2}>Administrator</MenuItem>
                                    <MenuItem value={3}>Editor</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {
                            errors.email || errors.role &&
                            <Grid item xs={12}>
                                <Typography variant="caption" color="error">{errors.email?.message}</Typography>
                                <Typography variant="caption" color="error">{errors.role?.message}</Typography>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Collapse in={error.active}>
                                <Alert severity='error' onClose={() => setError({active:false})} >{error.message}</Alert>
                            </Collapse>
                        </Grid>
                    </Grid>
                    
                    <Box>
                        <Typography variant="subtitle1" marginBottom={1}>Send a custom message</Typography>
                        <HtmlEditor
                            height={300}
                            valueType="html"
                            onValueChanged={(e) => setValue('message', e.value)}
                            onKey
                            >
                            <Toolbar>
                                <Item name="undo" />
                                <Item name="redo" />
                                <Item name="separator" />
                                <Item name="size" acceptedValues={sizeValues} />
                                <Item name="font" acceptedValues={fontValues} />
                                <Item name="separator" />
                                <Item name="bold" />
                                <Item name="italic" />
                                <Item name="strike" />
                                <Item name="underline" />
                                <Item name="separator" />
                                <Item name="alignLeft" />
                                <Item name="alignCenter" />
                                <Item name="alignRight" />
                                <Item name="alignJustify" />
                                <Item name="separator" />
                                <Item name="color" />
                                <Item name="background" />
                            </Toolbar>
                        </HtmlEditor>
                    </Box>
                    <Button fullWidth color="secondary" variant="outlined" type="submit" >Send Invite</Button>
                    
                </Stack>
            </form>
        </DialogContent>
  </Dialog>
  )
}

export default SearchUsers
