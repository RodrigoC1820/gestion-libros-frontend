import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default DashboardLayout