import { Box, Divider, Paper, Typography, TextField, Grid, FormControlLabel, Checkbox, InputAdornment, Autocomplete, Chip, Stack, Switch, Button } from '@mui/material'
import React, {useState} from 'react'
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import { DropzoneArea } from 'material-ui-dropzone';
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    title: yup.string().required(),
    category: yup.string().required(),
    stock : yup.number().positive().min(1),
    basePrice : yup.string().required(),
    descriptionLen : yup.number().min(50, 'description must have at least 50 words.'),
    description : yup.string().required(),
    shipping: yup.string().default('0.00'),
    imagesLen: yup.number().min(1, 'Your product must have at least 1 image.')
})

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana',];

const AddProductPage = ({categorys,handleAddProduct}) => {

    const { control, handleSubmit, register, formState:{ errors }, watch , setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const { fields, append, remove} = useFieldArray({
        control,
        name: 'voptions'
    })

    const [images, setImages] = useState();
    const [editorLen, setEditorLen] = useState(0);
    const [attributes, setAttributes] = useState();

    var freeShipping = watch('freeShipping')
    var addVariants = watch('addVariants')

    var basePrice = watch('basePrice')

    var variants = watch('voptions')

    const onSubmit = data => {

        handleAddProduct(data)
    };


    const valueChanged= (e)=>{
        setEditorLen(e.value.split(' ').filter(word => word !== '').length)
        setValue("descriptionLen", editorLen)
        setValue('description', e.value)
    }

    const allPossibleCases = (arr) => {

        if (arr.length == 1) {
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

    const handleVariants = () => {

        if(variants.length){

            var attrs= []

            for (const [attr, values] of Object.entries(variants))
            {
                console.log(values)
                attrs.push(values.values?.map(v => (v)));
                
            }

            var newAttrs= allPossibleCases(attrs)
            setAttributes(newAttrs)
        }
    }
  


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} >
                    <Box marginBottom={4}>
                    <Paper>
                        <Typography padding={2} >Title, Category and Description</Typography>
                        <Divider></Divider>
                        <Grid padding={2} container spacing={2} >
                            <Grid item xs={12} marginBottom={2}>
                                <TextField  {...register("title")} label="Title" fullWidth />
                                <Typography variant="caption" color="error">{errors.title?.message}</Typography>
                            </Grid>
                            <Grid item xs={12}  marginBottom={2}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        options={categorys}
                                        {...register('category')}
                                        renderInput={(params) => <TextField  {...params} {...register("category")}  helperText="Search for an existing category or add your own" placeholder='Start Searching here...'  label="Category"/>}
                                    />
                                    
                                    <Typography variant="caption" color="error">{errors.category?.message}</Typography>
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
                        </Grid>
                    </Paper>
                </Box>
                <Box marginBottom={4}>
                    <Paper >
                        <Typography variant="subtitle1" padding={2}>Shipping Options</Typography>
                        <Divider></Divider>
                        <Grid padding={2} container spacing={2} >
                            <Grid item xs={12} >
                                <FormControlLabel control={<Checkbox {...register("freeShipping")} defaultChecked/> } label="Free shipping" />
                            </Grid>
                            {
                                !freeShipping && 
                                <Grid item xs={12} marginBottom={2}>
                                    <TextField {...register("shipping")}  InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>,}} id="demo-helper-text-misaligned" label="Shipping price" fullWidth />
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
                                    onChange={(files) => {setImages(files); setValue('imagesLen', files.length); setValue('images', files)}}
                                    filesLimit={6}
                                />
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
                                
                                    step="0.01"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                        step: "0.01"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}  marginBottom={2}>
                                <TextField 
                                    fullWidth 
                                    defaultValue={1}
                                    {...register("stock")} 
                                    label="Total Units" 
                                    type="number"
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Typography> Variants</Typography>
                                <Grid item xs={12} >
                                    <FormControlLabel control={<Checkbox {...register("addVariants")} /> } label="This product has variants" />
                                </Grid>
                                { addVariants && 
                                    <>
                                        <Box paddingBottom={2} >
                                            <Button type="button" variant='outlined' onClick={() => append({})}>Add option</Button>
                                        </Box>
                                        {
                                            fields.map ( ({id}, index) =>{
                                                return (
                                                    <Stack key={id} direction={"row"} spacing={2} marginBottom={3}>
                                                        <TextField label="option name" {...register(`voptions[${index}].name`)} />
                                                        <Controller
                                                            name={`voptions[${index}].values`}
                                                            control={control}
                                                            render={() => (
                                                                <Autocomplete
                                                                    multiple 
                                                                    freeSolo
                                                                    fullWidth
                                                                    options={[]}
                                                                    name="values"
                                                                    onChange={(e, values) => {setValue(`voptions[${index}].values`, values);  }}
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
                                        {
                                        fields?.length>0 && <Button onClick={handleVariants}>Save Changes</Button>
                                        }
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
                { 
                    attributes &&
                    <Box marginBottom={4}>
                        <Paper >
                            <Typography variant="subtitle1" padding={2}>Combinations Options</Typography>
                            <Divider></Divider>
                            {
                                attributes?.map((attid,index)=>{
                                    return (
                                        <Grid  container spacing={3} marginTop={1} padding={2} key={index}>
                                            <input type="hidden" value={attid} {...register(`vprices[${index}].skuid`)}></input>
                                            <Grid item sm={12} md={2} alignContent={'center'}><Typography textAlign={'end'}>{attid.replaceAll( '?', ' / ') +" :" }</Typography></Grid>
                                            <Grid item sm={12} md={5}><TextField size="small" type="number" fullWidth label="Price" defaultValue={basePrice} {...register(`vprices[${index}].originalPrice`)} InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment>, step:' 0.01'}} /></Grid>
                                            <Grid item sm={12} md={5}><TextField size="small" type="number" fullWidth label="Stock" defaultValue={1} {...register(`vprices[${index}].availableQuantity`)} InputProps={{min:0}} /></Grid>
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
                            <Box padding={2}>
                                <Button padding={2} variant="contained" fullWidth type="submit">Save Changes</Button>
                            </Box>
                            <Box padding={2}>
                                <FormControlLabel control={<Switch defaultChecked {...register('active')}/>} label="Active Product" />
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

export default AddProductPage

