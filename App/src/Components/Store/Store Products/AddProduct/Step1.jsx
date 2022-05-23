import { Box, Divider, Paper, Typography, TextField, Grid, FormControlLabel, Checkbox, InputAdornment, Autocomplete, Chip, Stack, FormGroup, Button } from '@mui/material'
import React, {useState} from 'react'
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import { DropzoneArea } from 'material-ui-dropzone';
import { Controller, useFieldArray, useForm, useWatch} from 'react-hook-form';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana',];


const Step1 = ({ categorys, setHtmlEditor, setNewProd, setAttributes, handleNext}) => {


    const { register, control, handleSubmit, setValue, watch} = useForm();
    

    const { fields, append, remove} = useFieldArray({
        control,
        name: 'variants'
    })
    
    const allPossibleCases = (arr) => {
        if (arr.length == 0) return ;
        else if (arr.length == 1) {
          return arr[0];
        } 
        else {
            var result = [];
            var allCasesOfRest = allPossibleCases(arr.slice(1)); // recur with the rest of array
            for (var i = 0; i < allCasesOfRest.length; i++) {
                for (var j = 0; j < arr[0].length; j++) {
                result.push(arr[0][j] +"?"+ allCasesOfRest[i]);
                }
            }
            return result;
        }
      
      }


    const onSubmit = (data) =>{

        setNewProd(data)

        var attrs= []

        for (const [attr, values] of Object.entries(data.variants))
        {
            attrs.push(values.options?.map(v => (v)));
            
        }
  
        const newC = allPossibleCases(attrs);

        console.log(newC)

        if(newC) setAttributes(newC)

        handleNext();
       

    }

    const valueChanged= (e)=>{
        setHtmlEditor(e.value)
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
                    <Grid item xs={6}  marginBottom={2}>
                            <TextField required  {...register('sku')} label="SKU"   fullWidth />
                    </Grid>
                    <Grid item xs={6}  marginBottom={2}>
                        <TextField 
                            fullWidth 
                            required
                            {...register("price")} 
                            defaultValue={0.00}
                            label="Price" 
                            type="number"
                            step="0.01"
                            //onChange={(e) => setBasePrice(parseFloat(e.target.value).toFixed(2))}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                step: "0.01"
                            }}
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
                    <Grid item xs={12}>
                        <Box  marginBottom={3}>
                            <Button type="button" variant='outlined' onClick={() => append({})}>Add option</Button>
                        </Box>
                        
                        {
                            fields.map ( ({id}, index) =>{
                                return (
                                    <Stack key={id} direction={"row"} spacing={2} marginBottom={3}>
                                        <TextField label="option name" {...register(`variants[${index}].name`)} />
                                        <Controller
                                            name={`variants[${index}].options`}
                                            control={control}
                                            render={() => (
                                                <Autocomplete
                                                    multiple 
                                                    freeSolo
                                                    fullWidth
                                                    options={[]}
                                                    name="options"
                                                    onChange={(e, values) => {setValue(`variants[${index}].options`, values);  }}
                                                    renderInput={(params) =>(
                                                        <TextField
                                                            {...params}
                                                            
                                                            label="Values"
                                                            placeholder="You can add your personalized values"
                                                                />
                                                            )}
                                                        />
                                            )}
                                        />
                                        
                                        <Button type="button" variant='outlined' onClick={() => remove(index)}>Remove</Button>
                                    </Stack>
                                )
                            })
                        }
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
