import React from 'react'
import { createRoutesFromElements, Route } from 'react-router-dom'
import { Layout } from './ui/Layout'
import { Dashboard } from './ui/Dashboard'
import { Login } from './ui/Login'
import { Attendance } from './ui/Attendance'
import { Grades } from './ui/Grades'

export const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="login" element={<Login />} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="grades" element={<Grades />} />
  </Route>
)


