import React from 'react'
import {Grid, Container, Paper, Typography, Stack, Box, Select, MenuItem, FormControl, InputLabel, Button, Collapse, Alert} from '@mui/material';

const ProductFilters = ({SortProducts, setFilter , categorys, setDefProducts, defProducts, filter, order}) => {


    return (
        <Paper>
            <Stack padding={2} spacing={2}>
                <Typography variant="h6" textAlign="center">Filters</Typography>
                <FormControl fullWidth  size="small">
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
                <FormControl fullWidth  size="small">
                    <InputLabel id="categoryid">Category</InputLabel>
                    <Select
                        labelId="categoryid"
                        label="Category"
                        value={filter}
                        onChange={(e)=> setFilter(e.target.value)}
                        >
                            {
                                categorys.map((cat)=>{
                                    return <MenuItem value={cat} key={cat}>{cat}</MenuItem>
                                })
                            }
                    </Select>
                </FormControl>
                <Button color="error" onClick={()=>setDefProducts(defProducts +1)}>Clear all Filters</Button>
            </Stack>
        </Paper>
    )
}

export default ProductFilters
