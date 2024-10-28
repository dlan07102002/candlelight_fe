import "./App.css";
import Navbar from "./layouts/header-footer/header/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import About from "./layouts/abouts/About";
import ProductDetail from "./layouts/product/ProductDetail";
function App() {
    const [keyword, setKeyWord] = useState("");
    console.log("keyword: ", keyword);

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
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
