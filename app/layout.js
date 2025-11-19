"use client"
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Header from '../components/Header'
import '../styles/globals.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2e7d32' },
    secondary: { main: '#ffb300' }
  }
})

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Container maxWidth="lg" style={{ marginTop: 24 }}>
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
