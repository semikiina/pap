import { Autocomplete, TextField , Button, Stack, Typography, ListItemText} from '@mui/material';
import React , {useEffect, useState} from 'react';
import { Controller, useFieldArray, useForm, useWatch} from 'react-hook-form';




const Exemplo = () => {

    const { register, control, handleSubmit, setValue, watch} = useForm();
    
    const [attributes, setAttributes] = useState([]);

    var varArrary = [];

    const variants = useWatch({
        control,
        name: "variants",
    });

    const { fields, append, remove} = useFieldArray({
        control,
        name: 'variants'
    })
    

    const onSubmit = (data) =>{

        var attrs= []

        console.log(data)

        for (const [attr, values] of Object.entries(variants))
        {
            attrs.push(values.options?.map(v => ({[attr]:v})));
            
        }

        attrs = attrs.reduce((a, b) => a.flatMap(d => b.map(e => ({...d, ...e}))));

        console.log(attrs)

       

    }


    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                                            
                                            label="Sizes"
                                            placeholder="You can add your personalized size ( M, 32, 256Gb )"
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
           
            <Button type="button" variant='outlined' onClick={() => append({})}>Add Option</Button>
            <Button type="submit" variant="contained" color="success">Submit form</Button>
        </form>
    )
}

export default Exemplo
