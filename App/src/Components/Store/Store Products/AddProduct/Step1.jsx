import { Box, Divider, Paper, Typography, TextField, Grid, Autocomplete, Stack, Button } from '@mui/material'
import React, { useState } from 'react'
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import { useForm} from 'react-hook-form';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana',];


const Step1 = ({ categorys, setHtmlEditor, setNewProd, setAttributes, handleNext}) => {

    const { register, handleSubmit, setValue} = useForm();
    const [newHtml , setNewHtml] = useState();
    
    const onSubmit = (data) =>{
        setHtmlEditor(setNewHtml)
        setNewProd(data)
        handleNext()
    }

    const valueChanged= (e)=>{
        setNewHtml(e.value)
    }

    return (
        <Paper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box><Typography variant="subtitle1" padding={2}>Basic Informations</Typography></Box>
                <Divider></Divider>
                <Grid padding={2} container spacing={2} >
                    <Grid item xs={12} md={10} marginBottom={2}>
                        <TextField required label="Title" fullWidth {...register('title')} />
                    </Grid>
                    <Grid item xs={12} md={2} marginBottom={2}>
                        <TextField required defaultValue={1}    {...register('stock')} InputProps={{ inputProps: { min: 1} }} label="Stock" type="number"  fullWidth />
                    </Grid>
                    <Grid item xs={12}  marginBottom={2}>
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={categorys}
                                {...register('category')}
                                renderInput={(params) => <TextField required {...params}   helperText="Search for an existing category or add your own" placeholder='Start Searching here...'  label="Category"/>}
                            />
                    </Grid>
                    <Grid item xs={12} marginBottom={2}>
                        <Typography variant="subtitle1">Description</Typography>
                        <HtmlEditor
                            height={300}
                            valueType="html"
                            onValueChanged={valueChanged}
                            >
                            <Toolbar>
                                <Item name="undo" />
                                <Item name="redo" />
                                <Item name="separator" />
                                <Item name="size" acceptedValues={sizeValues}/>
                                <Item name="font" acceptedValues={fontValues}/>
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
                    </Grid>
                </Grid>
                <Box padding={2}>
                    <Stack direction="row" justifyContent={'flex-end'} ><Button type="submit" >Next</Button></Stack>
                </Box>
                
                
            </form>
           
        </Paper>
    )
}

export default Step1
