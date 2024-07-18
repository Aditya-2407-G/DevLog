import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
    Home,
    SignIn,
    SignUp,
    About,
    Dashboard,
    Projects,
} from "./pages/index.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return (
        <BrowserRouter>


        <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
        <Footer/>
            
        </BrowserRouter>
    );
}

export default App;
