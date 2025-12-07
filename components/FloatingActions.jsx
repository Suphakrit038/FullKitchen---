"use client"
import React from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/navigation'

export default function FloatingActions() {
  const router = useRouter()

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        zIndex: 1000
      }}
    >
      <Tooltip title="เพิ่มสูตรใหม่" placement="left">
        <Fab 
          color="primary" 
          size="medium"
          onClick={() => router.push('/recipes/new')}
          sx={{ 
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' }
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Tooltip title="แก้ไขสูตร" placement="left">
        <Fab 
          size="small"
          sx={{ 
            bgcolor: 'grey.700',
            color: 'white',
            '&:hover': { bgcolor: 'grey.800' }
          }}
        >
          <EditIcon fontSize="small" />
        </Fab>
      </Tooltip>

      <Tooltip title="ค้นหา" placement="left">
        <Fab 
          size="small"
          sx={{ 
            bgcolor: 'grey.700',
            color: 'white',
            '&:hover': { bgcolor: 'grey.800' }
          }}
        >
          <SearchIcon fontSize="small" />
        </Fab>
      </Tooltip>
    </Box>
  )
}
