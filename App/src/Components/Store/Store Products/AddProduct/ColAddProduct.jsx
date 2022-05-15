import { Box, Divider, Paper, Typography, TextField, Grid, FormControlLabel, Checkbox, InputAdornment, Autocomplete, Chip } from '@mui/material'
import React from 'react'
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import { DropzoneArea } from 'material-ui-dropzone';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana',];

const ColAddProduct = ({register,setImages,setHtmlEditor,Shipping,isDisabledShipping, categorys, colorValue, setColorValue, sizeValue, setSizeValue}) => {

    const colors=[ 'blue', 'light Blue',  'black' ,'green' ,'light Green', 'purple','red','orange','white','yellow']
    const sizes=['XS','S','M','L','XL','XXL']

    const valueChanged= (e)=>{
        setHtmlEditor(e.value)
    }
  

    return (
        <>
            <Box marginBottom={4}>
                <Paper>
                    <Typography variant="subtitle1" padding={2}>Details</Typography>
                    <Divider></Divider>
                    <Grid padding={2} container spacing={2} >
                        <Grid item xs={12} md={10} marginBottom={2}>
                            <TextField required {...register("title")} label="Title" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={2} marginBottom={2}>
                            <TextField required {...register("stock")} defaultValue={1}  InputProps={{ inputProps: { min: 1} }} label="Stock" type="number"  fullWidth />
                        </Grid>
                        <Grid item xs={12}  marginBottom={2}>
                                <Autocomplete
                                    id="free-solo-demo"
                                    freeSolo
                                    options={categorys}
                                    
                                    renderInput={(params) => <TextField required {...params} {...register("category")}  helperText="Search for an existing category or add your own" placeholder='Start Searching here...'  label="Category"/>}
                                />
                        </Grid>
                        <Grid item xs={12} marginBottom={2}>
                            <Typography variant="subtitle1">Description</Typography>
                            <HtmlEditor
                                height={300}
                                valueType="html"
                                onValueChanged={valueChanged}
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
                        <Autocomplete
                            multiple
                            options={colors.map(color=>color)}
                            freeSolo
                            value={colorValue}
                            onChange={(e, newValue) => setColorValue(newValue)}
                            renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip avatar={ <Box component="span" sx={{ bgcolor:`${option.replace(/ |_|-/g,'')}`, width: 40, height: 40, borderRadius: '50%', border: 1  }} />} variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                            }
                            renderInput={(params) =>(
                                <TextField
                                    {...params}
                                    
                                    label="Colors"
                                    placeholder="You can add your personalized color "
                                />
                            )}
                        /> 
                        </Grid>
                        <Grid item xs={12}  marginBottom={2}>
                            <Autocomplete
                                multiple
                                options={sizes.map(size=>size)}
                                freeSolo
                                value={sizeValue}
                                onChange={(e, newValue) => setSizeValue(newValue)}
                                renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                                }
                                renderInput={(params) =>(
                                    <TextField
                                        {...params}
                                        
                                        label="Sizes"
                                        placeholder="You can add your personalized size ( M, 32, 256Gb )"
                                    />
                                )}
                            /> 
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
        </>
    )
}

export default ColAddProduct

