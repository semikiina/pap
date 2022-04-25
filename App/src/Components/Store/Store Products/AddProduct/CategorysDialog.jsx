import { Autocomplete, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'

const CategorysDialog = ({open, handleClose, categorys, setSelectedCategorys,selectedCategorys}) => {

    const [value, setValue] =useState(null);

    if(!categorys) return <CircularProgress></CircularProgress>
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Categorys</DialogTitle>
                <DialogContent>
                    <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={categorys}
                        renderInput={(params) => <TextField required {...params} helperText="Search for an existing category or add your own" placeholder='Start Searching here...' />}
                        onInputChange={(event, newValue) => {
                            setValue(newValue)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={()=>{setSelectedCategorys(value); handleClose()}}> Add Category</Button>
                    <Button variant="contained" color="error"> Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CategorysDialog
