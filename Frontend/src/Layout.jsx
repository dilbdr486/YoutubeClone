import React from 'react'
import Footer from './Componenent/Footer/Footer'
import Header from './Componenent/Header/header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout