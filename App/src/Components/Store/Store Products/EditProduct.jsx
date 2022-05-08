import { Grid, Box, Paper, Button ,FormControlLabel, Divider,Typography, TextField, Checkbox, InputAdornment, Autocomplete, DialogActions, DialogContent, Dialog  } from '@mui/material'
import api from '../../../Services/api';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import { DropzoneArea } from 'material-ui-dropzone';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];

const EditProduct = ({storeid, open, handleClose}) => {

    const {  handleSubmit, register } = useForm();
    const [categorys, setCategorys] = useState([])
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [htmlEditor, setHtmlEditor] = useState();
    const [isDisabledShipping, setIsDisabledShipping] = useState(false);
    

    const valueChanged= (e)=>{
        setHtmlEditor(e.value)
    }

    const Shipping = (e)=>{
        if(!e.target.checked) setIsDisabledShipping(true)
        else setIsDisabledShipping(false)
    }

    const onSubmit = data => {
        var formData = new FormData();
        var ins = images.length;
        for (var x = 0; x < ins; x++) {
            formData.append("image", images[x]);
        }
        formData.append("title", data.title)
        formData.append("stock", data.stock)
        formData.append("active", data.active)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("description", htmlEditor)
        if(!isDisabledShipping)formData.append("shipping", data.shipping)
        else formData.append("shipping", 0)

        api.post('product/upd/'+storeid,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(data=>{
            window.location.href="./storeProducts"
        })
        .catch(err=>{
            console.log(err) 
        })
    };

    useEffect(()=>{
        api.get('product/categorys')
        .then(cats=>{
            setCategorys(cats.data)
        })
        .catch(err=>{
            console.log(err)
        })

        api.get('product/'+storeid)
        .then(cats=>{
            setProduct(cats.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    if(!product) return null;
    return (
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <Box marginBottom={4}>
                    <Paper>
                        <Typography variant="subtitle1" padding={2}>Details</Typography>
                        <Divider></Divider>
                        <Grid padding={2} container spacing={2} >
                            <Grid item xs={12} md={6} marginBottom={2} >
                                <TextField required {...register("title")} label="Title" fullWidth  defaultValue={product.title}   />
                            </Grid>
                            <Grid item xs={12} md={6} marginBottom={2}>
                                <TextField required {...register("stock")} defaultValue={product.stock}  label="Stock" type="number"  fullWidth helperText="This is the number of available products for sale. This will not appear to your client."/>
                            </Grid>
                            <Grid item xs={12}  marginBottom={2}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        options={categorys}
                                        renderInput={(params) => <TextField required {...params} {...register("category")} defaultValue={product?.category} helperText="Search for an existing category or add your own" placeholder='Start Searching here...'  label="Category"/>}
                                    />
                            </Grid>
                            <Grid item xs={12} marginBottom={2}>
                                <Typography variant="subtitle1">Description</Typography>
                                <HtmlEditor
                                    height={300}
                                    valueType="html"
                                    onValueChanged={valueChanged}
                                    defaultValue={product.description}
                                    onKey
                                    >
                                    <Toolbar>
                                        <Item name="undo" />
                                        <Item name="redo" />
                                        <Item name="separator" />
                                        <Item
                                        name="size"
                                        acceptedValues={sizeValues}
                                        />
                                        <Item
                                        name="font"
                                        acceptedValues={fontValues}
                                        />
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
                    </Paper>
                </Box>
                <Box marginBottom={4}>
                    <Paper >
                        <Typography variant="subtitle1" padding={2}>Price</Typography>
                        <Divider></Divider>
                        <Grid padding={2} container spacing={2} >
                            <Grid item xs={12}  marginBottom={2}>
                                <TextField required {...register("price")} label="Price" type="number" fullWidth step="0.01"/>
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
                                <TextField  label="Price" type="number" fullWidth />
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
                <Box marginBottom={4}>
                    <Paper >
                        <Typography variant="subtitle1" padding={2}>Shipping Options</Typography>
                        <Divider></Divider>
                        <Grid padding={2} container spacing={2} >
                            <Grid item xs={12} >
                                <FormControlLabel control={<Checkbox  onChange={Shipping} defaultChecked/> } label="Free shipping" />
                            </Grid>
                            {
                                isDisabledShipping && 
                                <Grid item xs={12} marginBottom={2}>
                                    <TextField {...register("shipping")}  InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>,}} id="demo-helper-text-misaligned" label="Shipping price" type="number" fullWidth />
                                </Grid>
                            }
                        </Grid>
                    </Paper>
                </Box>
                <Box marginBottom={4}>
                    <Paper >
                        <Typography variant="subtitle1" id="details" padding={2}>Media Upload</Typography>
                        <Divider></Divider>
                        <Grid padding={2} container spacing={2} >
                            <Grid item xs={12}  >
                                <DropzoneArea
                                    acceptedFiles={['image/*']}
                                    dropzoneText={"Drag and drop an image here or click here."}
                                    onChange={(files) => setImages(files)}
                                    filesLimit={6}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </DialogContent>
            </form>
            <DialogActions>
                <Button onClick={handleClose} color="error" variant="contained">Cancel </Button>
                <Button onClick={handleClose} autoFocus color="success" variant="contained">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditProduct
