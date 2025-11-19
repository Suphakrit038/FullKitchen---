"use client"
import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => router.push('/')}>สูตรอาหารของฉัน</Typography>
        <Button color="inherit" onClick={() => router.push('/add')}>+ เพิ่มสูตร</Button>
      </Toolbar>
    </AppBar>
  )
}
