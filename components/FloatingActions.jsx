"use client"
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/navigation'

export default function FloatingActions() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const actions = [
    { icon: <AddIcon />, name: 'เพิ่มสูตรใหม่', action: () => router.push('/recipes/new') },
    { icon: <EditIcon />, name: 'แก้ไขสูตร', action: () => console.log('Edit') },
    { icon: <SearchIcon />, name: 'ค้นหา', action: () => document.getElementById('header-search')?.focus() }
  ]

  return (
    <SpeedDial
      ariaLabel="Quick actions"
      sx={{ 
        position: 'fixed', 
        bottom: 24, 
        right: 24,
        '& .MuiFab-primary': {
          bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'primary.dark' }
        }
      }}
      icon={<SpeedDialIcon />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => {
            action.action()
            setOpen(false)
          }}
        />
      ))}
    </SpeedDial>
  )
}
