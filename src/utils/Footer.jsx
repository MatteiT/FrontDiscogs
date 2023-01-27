import { Box } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box 
        position='static'
        bottom={0} 
        width="100%" 
        bgcolor="primary.main" 
        color="primary.contrastText" 
        p={2} 
        mt={5}
        textAlign="center"
    >
        <p> Mattei Tristan DWWM © 2022 - 2023 - All Rights Reserved</p>
    </Box>
  )
}

export default Footer
