import React, { useEffect, useState } from 'react'
import {Typography, Stack, Select, MenuItem, FormControl, InputLabel, Button, Checkbox, Slider, Autocomplete, TextField} from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

const StoreFilters = ({SortProducts, handleProductFilters , categorys, order , priceRange}) => {

    const [filterCategory, setFilterCategory] = useState([]);

    const [value, setValue] = useState([0.00,0.00]);

    const handleChangeSlider = (e, data) => {
        setValue(data);
    };

    const handleChangeCategory = (e, data) => {
        setFilterCategory(data);
    };

    useEffect(()=>{
        if(priceRange) setValue(priceRange)
    },[priceRange])

    const handleProductFilterClear = () => {
        setFilterCategory([])
        setValue([priceRange[0], priceRange[1]])
    }


    return (
        <>
            <Stack padding={2} spacing={2} direction="row">
                
                <FormControl sx={{minWidth:200}}>
                    <InputLabel id="orderbyid">Order By</InputLabel>
                    <Select
                        labelId="orderbyid"
                        label="Order By"
                        value={order}
                        onChange={SortProducts}
                        >
                        <MenuItem value={1}>Recommended</MenuItem>
                        <MenuItem value={2}>Price Low to High</MenuItem>
                        <MenuItem value={3}>Price High to Low</MenuItem>
                        <MenuItem value={4}>New Arrivals</MenuItem>
                    </Select>
                </FormControl>
                <Autocomplete 
                    multiple
                    id="checkboxes-tags-demo"
                    options={categorys}
                    value={filterCategory}
                    onChange={handleChangeCategory}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                        icon={<CheckBoxOutlineBlank fontSize="small" />}
                        checkedIcon={<CheckBox fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        />
                        {option}
                    </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                    <TextField {...params} label="Categorys" placeholder="Search for a category" />
                    )}
                />
                <Stack sx={{minWidth:200}} alignItems={'center'}>
                    <Slider
                        value={value}
                        onChange={handleChangeSlider}
                        valueLabelDisplay="auto"
                        step={0.01}
                        min={priceRange[0]}
                        max={priceRange[1]}
                    />
                    <Typography>{`${value[0]} € - ${value[1]} € `}</Typography>
                </Stack>
                <Button  onClick={()=>handleProductFilters(filterCategory, value)}>Filter</Button>
                <Button color="error" onClick={handleProductFilterClear}>Clear all Filters</Button>
            </Stack>
        </>
    )
}

export default StoreFilters