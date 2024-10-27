import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layouts/abouts/About";
function App() {
    const [keyword, setKeyWord] = useState("");
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar setKeyWord={setKeyWord} />
                <Routes>
                    <Route path="/" element={<HomePage keyword={keyword} />} />
                    <Route
                        path="/:categoryId"
                        element={<HomePage keyword={keyword} />}
                    />

                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
