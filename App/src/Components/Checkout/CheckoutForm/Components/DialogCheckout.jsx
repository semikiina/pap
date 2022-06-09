import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material'

const DialogCheckout = ({open, handleClose}) => {
	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle id="alert-dialog-title">
				{"Order placed Successfully!"}
				</DialogTitle>
				<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Thanks For Purchasing with TagMe!
				</DialogContentText>
				</DialogContent>
				<DialogActions>
				<Button onClick={()=>{ window.location.href ="../orders"}}>My orders</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default DialogCheckout
