import "./App.css";
import Navbar from "./layouts/header-footer/header/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layouts/abouts/About";
import ProductDetail from "./layouts/product/ProductDetail";
import Register from "./layouts/user/RegisterForm";
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

                    <Route
                        path="/products/:productId"
                        element={<ProductDetail />}
                    />

                    <Route path="/about" element={<About />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
