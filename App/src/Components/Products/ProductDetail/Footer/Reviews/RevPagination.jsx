import { Pagination } from '@mui/material';
import React from 'react'

const RevPagination = ({revPerPage, totalRevs, currentPage, handlePaginationChange}) => {
  
    return (
    <Pagination count ={Math.ceil(totalRevs / revPerPage)} page={currentPage} onChange={handlePaginationChange} />
  )
}

export default RevPagination
