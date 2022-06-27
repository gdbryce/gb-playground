import React, { useState } from 'react'
import { Container, TextField, Box } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import BlogEventLocationPicker from './BlogEventLocationPicker'

const BlogEventEntry = () => {
  const [eventDate, setEventDate] = useState(new Date())
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1
      }}
    >
      <DateTimePicker 
        label="When is it happening?"
        renderInput={(params) => <TextField {...params} />}
        value={eventDate}
        onChange={(newValue) => {
          setEventDate(newValue);
        }}
      />
      <BlogEventLocationPicker />
    </Box>
  )
}

export default BlogEventEntry
