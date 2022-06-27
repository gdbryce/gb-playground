import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import { fontStyle } from '@mui/system'
import React, { useState } from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const tmpOptions= [
  {
    id: 1,
    type: "Place",
    formattedAddress: "Farley",
    locality: "Alton",
    adminDistrict2: "Staffordshire",
    adminDistrict: "England"
  },
  {
    id: 2,
    type: "Place",
    formattedAddress: "Alton Towers",
    locality: "Alton Towers",
    adminDistrict2: "Staffordshire",
    adminDistrict: "England"
  },
  {
    id: 3,
    type: "Address",
    formattedAddress: "Town Head, Alton ST10 4AW",
    locality: "Alton",
    adminDistrict2: "Staffordshire",
    adminDistrict: "England"
  },
  {
    id: 4,
    type: "Address",
    formattedAddress: "Tower Street, Alton",
    locality: "Alton",
    adminDistrict2: "Hampshire",
    adminDistrict: "England"
  },
  {
    id: 5,
    type: "Address",
    formattedAddress: "Alton Street, Belfast BT13 1AP",
    locality: "Belfast",
    adminDistrict2: "Belfast City",
    adminDistrict: "Northern Ireland"
  }
]

const getAutocompleteIcon = (optionType) => {
  switch (optionType) {
    case "Place":
      return <PlaceIcon />
    case "Address":
        return <MyLocationIcon />
    default:
      return <QuestionMarkIcon />
  }
}

const BlogEventLocationPicker = () => {
  const [options, setoptions] = useState(tmpOptions.map((option) => {return {...option, label: option.formattedAddress}}))

  return (
    <Autocomplete 
      disablePortal
      id="BlogEntry-blogEvent-autocomplete-location"
      options={tmpOptions}
      getOptionLabel={(option) => option.formattedAddress}
      sx={{
        width: "50%",
        ml: 1
      }}
      renderInput={(params) => <TextField {...params} label="Where is it happening?" />}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            display: "flex",
            flexDirection: "row"
          }}
          {...props}
        >
          {getAutocompleteIcon(option.type)}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: 1
            }}
          >
            <Typography variant="body1" component="h5">{option.formattedAddress}</Typography>
            <Typography variant="subtitle2" componet="h6" sx={{display:"block", fontStyle: "oblique"}}> {option.locality} {option.adminDistrict2} {option.adminDistrict}</Typography>
          </Box>
        </Box>
      )}
    />
  )
}

export default BlogEventLocationPicker
