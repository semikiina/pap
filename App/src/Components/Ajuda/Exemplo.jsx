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
    
    const allPossibleCases = (arr) => {
        if (arr.length == 1) {
          return arr[0];
        } else {
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


    const onSubmit2 = (data) =>{

        console.log(data)

       

    }
    const onSubmit = (data) =>{

        var attrs= []

        console.log(data)

        for (const [attr, values] of Object.entries(variants))
        {
            attrs.push(values.options?.map(v => (v)));
            
        }
  
        setAttributes(allPossibleCases(attrs))


       

    }


    

    return (
        <>
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
        <form onSubmit={handleSubmit(onSubmit2)}>
            <div>
                {
                attributes?.map((attid,index)=>{
                    return (
                        
                        <Stack direction="row" spacing={2} marginBottom={2}>
                            <input type="hidden" value={attid} {...register(`combs[${index}].name`)}></input>
                            <Typography>{attid}</Typography>
                            <TextField  label="price" defaultValue={0} {...register(`combs[${index}].price`)}/>
                            <TextField  label="stock" defaultValue={1} {...register(`combs[${index}].stock`)}/>
                        </Stack>
                    )
                }) 
                }
            </div>
            <Button type="submit" variant="contained" color="success">Submit form 2</Button>
        </form>
        </>
    )
}

export default Exemplo
