import { Box, Divider, Paper, Typography, TextField, Grid, FormControlLabel, Checkbox, InputAdornment, Autocomplete, Stack, Button } from '@mui/material'
import React, { useRef } from 'react'
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import { Delete } from '@mui/icons-material';
import api from '../../../../Services/api';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];

const ColEditProduct = ({product,setProduct, register,setUpdate,update,setHtmlEditor,Shipping,isDisabledShipping, categorys}) => {

    const valueChanged= (e)=>{
        setHtmlEditor(e.value)
        setProduct( {...product , description: e.value})
    }

    const DeleteImg =(src) =>{
        api.post('product/deleteImage/'+product._id,{
            img: src
        })
        .then(data=>{
            setUpdate(update+1)
        })
        .catch(err=>{
            console.log(err) 
        })
    }

    const UploadImage =(event) =>{

        var formData = new FormData();
        formData.append('image', event.target.files[0])

        api.post('product/uploadImage/'+product._id,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(data=>{
            setUpdate(update+1)
        })
        .catch(err=>{
            console.log(err) 
        })
    }

    const inputFile = useRef(null);
    const onButtonClick = () => {
       inputFile.current.click();
    };

    if(!product) return null;
    return (
        <>
            <Box marginBottom={4}>
                <Paper>
                    <Typography variant="subtitle1" padding={2}>Details</Typography>
                    <Divider></Divider>
                    <Grid padding={2} container spacing={2} >
                        <Grid item xs={12} md={6} marginBottom={2}>
                            <TextField required {...register("title")} label="Title" fullWidth value={product.title}  onChange={(e) => setProduct( {...product , title: e.target.value})}/>
                        </Grid>
                        <Grid item xs={12} md={6} marginBottom={2}>
                            <TextField required {...register("stock")}  label="Stock" type="number"  fullWidth value={product.stock}  onChange={(e) => setProduct( {...product , stock: e.target.value})} helperText="This is the number of available products for sale. This will not appear to your client."/>
                        </Grid>
                        <Grid item xs={12}  marginBottom={2}>
                                <Autocomplete
                                    value={product.category}  
                                    freeSolo
                                    options={categorys}
                                    renderInput={(params) => <TextField required {...params} {...register("category")} onChange={(e) => setProduct( {...product , category: e.target.value})}   helperText="Search for an existing category or add your own" placeholder='Start Searching here...'  label="Category"/>}
                                />
                        </Grid>
                        <Grid item xs={12} marginBottom={2}>
                            <Typography variant="subtitle1">Description</Typography>
                            <HtmlEditor
                                height={300}
                                valueType="html"
                                onValueChanged={valueChanged}
                                value={product.description}
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
                            <TextField required {...register("price")} value={parseFloat(product.price).toFixed(2)}  onChange={(e) => setProduct( {...product , price: e.target.value})} InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment> , step:"0.01", maxLength : 13}} label="Price" type="number" fullWidth />
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
                            <FormControlLabel control={<Checkbox  onChange={Shipping} checked={isDisabledShipping}/> } label="Free shipping" />
                        </Grid>
                        {
                            !isDisabledShipping && 
                            <Grid item xs={12} marginBottom={2}>
                                <TextField {...register("shipping")} value={product.shipping}  onChange={(e) => setProduct( {...product , shipping: e.target.value})}  InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>,}}  label="Shipping price" type="number" fullWidth />
                            </Grid>
                        }
                    </Grid>
                </Paper>
            </Box>
            <Box marginBottom={4}>
                <Paper >
                    <Typography variant="subtitle1" id="details" padding={2}>Media Upload</Typography>
                    <Divider></Divider>
                    <Box  padding={2}>
                        <Button variant="outlined" onClick={onButtonClick}>Add Image</Button>
                        <input type="file" hidden ref={inputFile} onChange={(e) => UploadImage(e)}/>
                    </Box>
                    
                    <Grid padding={2} container spacing={2} >
                        {
                            product.images?.map(src => {
                                return (
                                    <Grid item xs={12} md={4} key={src}>
                                        <Stack>
                                            <img src={'https://tagmeapi.herokuapp.com/'+src} style={{ width: 200 , height : 200 , objectFit : 'cover'}}/>
                                            <Delete onClick={()=>{DeleteImg(src)}}/>
                                        </Stack>
                                        
                                    </Grid>
                                )
                            })
                        }
                        
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}

export default ColEditProduct
