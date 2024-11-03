import "./App.css";
import Navbar from "./layouts/header-footer/header/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import About from "./layouts/about/About";
import ProductDetail from "./layouts/product/ProductDetail";
import Register from "./layouts/user/Register";
import AccountActivate from "./layouts/user/AccountActivate";
import Login from "./layouts/user/Login";
import Test from "./layouts/user/Test";
import ProductForm from "./layouts/admin/ProductForm";
import { jwtDecode } from "jwt-decode";
import CartList from "./layouts/product/cart/CartList";
interface JwtPayload {
    uid: number;
    exp: number;
}
const App: React.FC = () => {
    const [keyword, setKeyWord] = useState("");
    const [isLogin, setLogin] = useState(false);
    const [userId, setUserId] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = jwtDecode(token) as JwtPayload;
            // s -> ms
            setUserId(decodedToken.uid);

            const exp = decodedToken.exp ? decodedToken.exp * 1000 : 0;
            if (decodedToken.exp && Date.now() > exp) {
                console.log("Expired");
                // localStorage.removeItem("token");
            } else {
                setLogin(true);
            }
        }
    }, [isLogin]);

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar
                    setKeyWord={setKeyWord}
                    isLogin={isLogin}
                    setLogin={setLogin}
                />
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
                    <Route
                        path="/login"
                        element={
                            <Login isLogin={isLogin} setLogin={setLogin} />
                        }
                    />

                    <Route
                        path="/activate/:email/:activateCode"
                        element={<AccountActivate />}
                    />

                    <Route
                        path="/cart"
                        element={<CartList userId={userId} />}
                    />

                    <Route
                        path="/admin/product-form"
                        element={<ProductForm />}
                    />
                    <Route path="/test" element={<Test />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
