import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Componenent/Home/home.jsx'
import Sidebar from './Componenent/Sidebar/sidebar.jsx'
import Login from './Componenent/Login/login.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout />}>
      <Route path='' element={<Home />}/>
      <Route path='sidebar' element = {<Sidebar/>}/>
      <Route path='sidebar' element = {<Login />}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
