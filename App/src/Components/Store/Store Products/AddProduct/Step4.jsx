import { Paper, Typography, Stack,Button, Box } from '@mui/material'
import React from 'react'

const Step4 = ({handleBack}) => {
    return (
        <Paper>
        <Typography>Reviem</Typography>
            <Box padding={2}>
                <Stack direction="row" justifyContent={'flex-end'}>
                    <Button onClick={handleBack}>Back</Button>
                </Stack>
            </Box>
        </Paper>
    )
}

export default Step4
