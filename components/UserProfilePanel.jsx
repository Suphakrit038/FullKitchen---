"use client"
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Badge from '@mui/material/Badge'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import PersonIcon from '@mui/icons-material/Person'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

export default function UserProfilePanel() {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <IconButton color="inherit" size="small">
        <Badge badgeContent={3} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <IconButton color="inherit" size="small">
        <SettingsIcon />
      </IconButton>

      <Button
        variant="outlined"
        startIcon={<SupportAgentIcon />}
        size="small"
        sx={{ 
          borderColor: 'white', 
          color: 'white',
          textTransform: 'none',
          display: { xs: 'none', md: 'flex' }
        }}
      >
        ติดต่อเจ้าหน้าที่
      </Button>

      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ color: 'white', textTransform: 'none', minWidth: 'auto' }}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
          <PersonIcon fontSize="small" />
        </Avatar>
        <Typography variant="body2" sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
          ผู้ใช้งาน
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <PersonIcon fontSize="small" sx={{ mr: 1 }} />
          โปรไฟล์
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
          ตั้งค่า
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          ออกจากระบบ
        </MenuItem>
      </Menu>
    </Box>
  )
}
