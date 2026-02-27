import React from 'react'
import { Outlet } from 'react-router-dom'

import AppNavbar1 from './AppNavbar1'
import AppFooter1 from './AppFooter1'

const AppLayout1 = () => {
  return (
    <>
        <AppNavbar1 />
        <Outlet />  
        <AppFooter1 />
    </>
  )
}

export default AppLayout1;