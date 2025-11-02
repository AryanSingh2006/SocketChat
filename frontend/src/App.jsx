import React from 'react'

import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import SettingPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"

import { Routes, Route } from 'react-router-dom'
import {useAuthStore} from "./store/useAuthStore"

const App = () => {
  const {authUser} = useAuthStore()
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/settings' element={<SettingPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App