import { Divider, Grid, Paper, Typography, TextField, InputAdornment, Autocomplete, Button , Box, Stack } from '@mui/material'
import React from 'react'
import { Controller, useFieldArray, useForm} from 'react-hook-form';

const Step2Variantes = ({handleNext, handleBack , setAttributes, setNewPr, newPr}) => {

    const { register, control, handleSubmit, setValue, watch} = useForm();
    

    const { fields, append, remove} = useFieldArray({
        control,
        name: 'variants'
    })

    const allPossibleCases = (arr) => {
        console.log(arr)
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

    const onSubmit = (data) =>{

        if(data.variants){

            var attrs= []

            for (const [attr, values] of Object.entries(data.variants))
            {
                console.log(values)
                attrs.push(values.values?.map(v => (v)));
                
            }

            var newAttrs= allPossibleCases(attrs)
            setAttributes(newAttrs)
            setNewPr({...newPr, 
                sku : data.sku,
                basePrice : data.price,
                variants: data.variants
            })
            handleNext();
        }
        else{

            setNewPr({...newPr, 
                sku : data.sku,
                baseprice : data.price,
            })
            handleNext();
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper >
                <Typography variant="h6" padding={2}> SKU, Price and Shipping</Typography>
                <Divider />
                
                <Grid container padding={2} spacing={2}>
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
                </Grid>
                {/* Falta adicionar o shipping */}
            </Paper>
            <Box marginTop={5}>
                <Paper >
                    <Typography variant="h6" padding={2}> Variants</Typography>
                    <Divider />
                    <Box padding={2} marginBottom={1}>
                        <Button type="button" variant='outlined' onClick={() => append({})}>Add option</Button>
                    </Box>
                    <Box padding={2}>
                        {
                            fields.map ( ({id}, index) =>{
                                return (
                                    <Stack key={id} direction={"row"} spacing={2} marginBottom={3}>
                                        <TextField label="option name" {...register(`variants[${index}].name`)} />
                                        <Controller
                                            name={`variants[${index}].values`}
                                            control={control}
                                            render={() => (
                                                <Autocomplete
                                                    multiple 
                                                    freeSolo
                                                    fullWidth
                                                    options={[]}
                                                    name="values"
                                                    onChange={(e, values) => {setValue(`variants[${index}].values`, values);  }}
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
                    </Box>
                </Paper>
            </Box>
            
            <Box padding={2}>
                <Stack direction="row" justifyContent={'flex-end'}>
                    <Button onClick={handleBack}>Back</Button>
                    <Button type="submit">Next</Button>
                </Stack>
            </Box>
        </form>
    )
}

export default Step2Variantes
