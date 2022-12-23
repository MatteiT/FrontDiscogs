import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'


const Banner = () => {
  const mode = useSelector((state) => state.theme.mode);

  let style = {}

  if (mode === 'dark') {
    style={ background:  `linear-gradient(to bottom, #000000 0%, #434343 100%)`} 
  } else if (mode === 'light') {
    style={ background: `linear-gradient(72deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 22%, rgba(252,176,69,1) 100%)`}}


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
          width: '100%',
          color: 'lightgrey',
          fontSize: '30px',
        }}
        style={style}
      >
        <h1>Discogs API</h1>
      </Box>
    </>
    )
}

export default Banner