import React from "react"
// import logo from "./logo.svg"
// import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./containers/Home"
import HomePage from "./containers/HomePage"
// import Login from "./containers/Login"
import Login from "./components/Login"
import Register from "./containers/Register"
import { AppBar } from "@mui/material"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
