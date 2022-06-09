import { Box, Divider, Paper, Typography, TextField, Grid, FormControlLabel, Checkbox, InputAdornment, Autocomplete, Chip, Stack, Switch, Button, Alert } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import { DropzoneArea } from 'material-ui-dropzone';
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CssBaseline from '@mui/material/CssBaseline';

const schema = yup.object({
    title: yup.string().required(),
    category: yup.string().required(),
    stock : yup.number().positive().min(1),
    basePrice : yup.string().required(),
    descriptionLen : yup.number().min(50, 'description must have at least 50 words.'),
    description : yup.string().required(),
    imagesLen: yup.number().min(1, 'Your product must have at least 1 image.')
})

const theme = createTheme({
    overrides: {
        MuiDropzonePreviewList: {
            removeButton:{
                padding: -10,
                position:"relative",
                right : 0,
            }
      }
    }
  });

  

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana',];

const ColEditProduct = ({product, categorys, setProduct, images, handleEdit}) => {


    const { handleSubmit, register, formState:{ errors }, watch , setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const [htmlEditor, setHtmlEditor] = useState();
    const [editorLen, setEditorLen] = useState(0);

    var freeShipping = watch('freeShipping')

    const onSubmit = data => {

        handleEdit(data)
    };

    const valueChanged= (e)=>{
        setHtmlEditor(e.value)
        setEditorLen(e.value.split(' ').filter(word => word !== '').length)
        setValue("descriptionLen", editorLen)
        setValue('description', e.value)
        
    }

    useEffect(()=>{
        setValue("descriptionLen", editorLen)

    },[editorLen])

    useEffect(()=>{
        setValue("title", product.title)
        setValue("category", product.category)
        setValue("description", product.description)
        setValue("shipping", product.shipping)
        setValue("images", product.images)
        setValue("basePrice", product.basePrice)
        setValue("stock", product.stock)
        setValue("vprices", product.variants?.prices)
        
        setHtmlEditor(product.description)
        setEditorLen(product.description.split(' ').filter(word => word !== '').length)
        setValue("descriptionLen", editorLen)

    },[product, images])

    if(!product) return null;
    return (
        <CssBaseline>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} >
                    <Box marginBottom={4}>
                    <Paper>
                        <Typography padding={2} >Title, Category and Description</Typography>
                        <Divider></Divider>
                        <Grid padding={2} container spacing={2} >
                            <Grid item xs={12} marginBottom={2}>
                                <TextField  {...register("title")} value={product.title}  onChange={(e) => {setProduct( {...product , title: e.target.value}); setValue("title", product.title)}} label="Title" fullWidth />
                                <Typography variant="caption" color="error">{errors.title?.message}</Typography>
                            </Grid>
                            <Grid item xs={12}  marginBottom={2}>
                                <Autocomplete
                                    id="free-solo-demo"
                                    freeSolo
                                    options={categorys}
                                    {...register('category')}
                                    value={product.category}  
                                    renderInput={(params) => <TextField  {...params} {...register("category")} onChange={(e) => { console.log(e.target.value); setProduct( {...product , category: e.target.value}) ;   setValue("category", product.category)}}  helperText="Search for an existing category or add your own" placeholder='Start Searching here...'  label="Category"/>}
                                />
                                <Typography variant="caption" color="error">{errors.category?.message}</Typography>
                            </Grid>
                            {htmlEditor && 
                                <Grid item xs={12} marginBottom={2}>
                                    <Typography variant="subtitle1">Description</Typography>
                                    <HtmlEditor
                                        height={300}
                                        valueType="html"
                                        defaultValue={htmlEditor}  
                                        onValueChanged={valueChanged}
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
                                    <Typography variant="caption" >Total words: {editorLen}</Typography>
                                    <br/>
                                    <Typography variant="caption" color="error">{errors.descriptionLen?.message}</Typography>
                                    <Typography variant="caption" color="error">{errors.description?.message}</Typography>
                                </Grid>
                            }
                        </Grid>
                    </Paper>
                </Box>
                <Box marginBottom={4}>
                    <Paper >
                        <Typography variant="subtitle1" padding={2}>Shipping Options</Typography>
                        <Divider></Divider>
                        <Grid padding={2} container spacing={2} >
                            <Grid item xs={12} >
                                <FormControlLabel 
                                    control=
                                        {<Checkbox 
                                            {...register("freeShipping")} 
                                            defaultChecked={false} 
                                        /> } 
                                    label="Free shipping"
                                     />
                            </Grid>
                            {
                                !freeShipping && 
                                <Grid item xs={12} marginBottom={2}>
                                    <TextField {...register("shipping")} value={product.shipping}  onChange={(e) => {setProduct( {...product , shipping: e.target.value}); setValue("shipping", product.shipping)}}  InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>,}} id="demo-helper-text-misaligned" label="Shipping price" fullWidth />
                                </Grid>
                            }
                            <Typography variant="caption" color="error">{errors.shipping?.message}</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Box marginBottom={4}>
                    <Paper >
                        <Typography variant="subtitle1" id="details" padding={2}>Media Upload</Typography>
                        <Divider></Divider>
                        <Grid padding={2} container spacing={2} >
                            <Grid item xs={12}  margin={2}>
                                {
                                    images.length &&
                                    <DropzoneArea
                                        initialFiles={images}
                                        acceptedFiles={['image/*']}
                                        dropzoneText={"Drag and drop an image here or click here."}
                                        onChange={(files) => {setValue('imagesLen', files.length); setValue('images', files)}}
                                        filesLimit={6}
                                    />
                                }
                               
                            </Grid>
                            <Typography variant="caption" color="error" padding={2}>{errors.imagesLen?.message}</Typography>
                        </Grid>
                        
                    </Paper>
                </Box>

                <Box marginBottom={4}>
                    <Paper >
                        <Typography variant="subtitle1" padding={2}>Price, Inventory and Variants</Typography>
                        <Divider></Divider>
                        <Grid padding={2} container spacing={2} >
                            <Grid item xs={6}  marginBottom={2}>
                                <TextField 
                                    fullWidth 
                                    {...register("basePrice")} 
                                    label="Base Price" 
                                    value={product.basePrice}  onChange={(e) => {setProduct( {...product , basePrice: e.target.value}); setValue("basePrice", product.basePrice)}} 
                                    step="0.01"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                        step: "0.01"
                                    }}
                                />
                                <Typography variant="caption" color="error" padding={2}>{errors.basePrice?.message}</Typography>
                            </Grid>
                            <Grid item xs={6}  marginBottom={2}>
                                <TextField 
                                    fullWidth 
                                    {...register("stock")} 
                                    value={product.stock}  onChange={(e) => {setProduct( {...product , stock: e.target.value}); setValue("stock", product.stock)}} 
                                    label="Total Units" 
                                    type="number"
                                />
                                <Typography variant="caption" color="error" padding={2}>{errors.stock?.message}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity="warning">Editing variants is not available at the moment!</Alert>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
                { 
                    product.variants &&
                    <Box marginBottom={4}>
                        <Paper >
                            <Typography variant="subtitle1" padding={2}>Combinations Options</Typography>
                            <Divider></Divider>
                            {
                                 product.variants.prices.map((attid,index)=>{
                                    return (
                                        <Grid  container spacing={3} marginTop={1} padding={2} key={index}>
                                            <input type="hidden" value={attid.skuid} {...register(`vprices[${index}].skuid`)}></input>
                                            <Grid item sm={12} md={2} alignContent={'center'}><Typography textAlign={'end'}>{attid.skuid.replaceAll( '?', ' / ') +" :" }</Typography></Grid>
                                            <Grid item sm={12} md={5}><TextField size="small" type="number" fullWidth label="Price" defaultValue={attid.originalPrice} {...register(`vprices[${index}].originalPrice`)} InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment>, step:' 0.01'}} /></Grid>
                                            <Grid item sm={12} md={5}><TextField size="small" type="number" fullWidth label="Stock" defaultValue={attid.availableQuantity} {...register(`vprices[${index}].availableQuantity`)} InputProps={{min:0}} /></Grid>
                                        </Grid>
                                    )
                                }) 
                            }
                        </Paper>
                    </Box>
                }
                </Grid>
                <Grid item xs={12} md={4} >
                    <Box marginBottom={4}>
                        <Paper >
                            <Stack direction="row" spacing={2} padding={2}>
                                <Button padding={2} variant="contained" color="error" fullWidth href="../storeProducts">Cancel</Button>
                                <Button padding={2} variant="contained" fullWidth type="submit">Save Changes</Button>
                            </Stack>
                            <Box padding={2}>
                                <FormControlLabel control={<Switch defaultChecked={false} {...register('active')}/>} label="Active Product" />
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </form>
        </CssBaseline>
    )
}

export default ColEditProduct
