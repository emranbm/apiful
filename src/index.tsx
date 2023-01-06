import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/scss/bootstrap.scss' // Bootstrap should be imported before index.scss to not rollback overrides
import './index.scss'

import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/Navbar"
import LoginContext from "./components/LoginContext"
import loginUtils from "./utils/LoginUtils"
import {ToastContainer} from 'react-toastify'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Drawer from "./components/Drawer"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Root/>
        <ToastContainer position="bottom-right"/>
    </React.StrictMode>,
)

function Root() {
    const [isLoggedIn, setIsLoggedIn] = useState(loginUtils.isLoggedIn())
    const [drawerVisible, setDrawerVisible] = useState(false)

    return <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <Navbar setDrawerVisibleFunc={setDrawerVisible}/>
        <Drawer visible={drawerVisible} onHide={() => setDrawerVisible(false)}/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    </LoginContext.Provider>
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
