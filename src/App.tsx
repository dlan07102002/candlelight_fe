import "./App.css";
import Navbar from "./layouts/header-footer/header/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./layouts/about/About";
import ProductDetail from "./layouts/product/ProductDetail";
import Register from "./layouts/user/Register";
import AccountActivate from "./layouts/user/AccountActivate";
import Login from "./layouts/user/Login";
import Test from "./layouts/user/Test";
import ProductForm from "./layouts/admin/ProductForm";
import { jwtDecode } from "jwt-decode";
import CartList from "./layouts/product/cart/CartList";
import {
    createOrder,
    getLatestOrderAndOrderDetailByUserId,
} from "./services/OrderAPI";
import OrderModel from "./models/OrderModel";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import OrderDetailModel from "./models/OrderDetailModel";
import AdminDashboard from "./layouts/admin/AdminDashboard";
interface JwtPayload {
    uid: number;
    exp: number;
}
// Tạo Context
interface MyContextType {
    userId: number;
    order: OrderModel | undefined;
    orderDetails: OrderDetailModel[] | undefined;
    setUserId: React.Dispatch<React.SetStateAction<number>> | undefined;
}
export const MyContext = createContext<MyContextType>({
    userId: 0,
    setUserId: undefined,
    order: undefined,
    orderDetails: undefined,
});
const App: React.FC = () => {
    const [keyword, setKeyWord] = useState("");
    const [isLogin, setLogin] = useState(false);
    const [userId, setUserId] = useState(0);
    const [latestOrder, setLatestOrder] = useState<OrderModel | undefined>(
        undefined
    );

    const [isNewOrder, setIsNewOder] = useState(false);
    const [orderDetails, setOrderDetails] = useState<OrderDetailModel[]>([]);
    const location = useLocation();
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token) as JwtPayload;
                // s -> ms
                setUserId(decodedToken.uid);

                const exp = decodedToken.exp ? decodedToken.exp * 1000 : 0;
                if (decodedToken.exp && Date.now() > exp) {
                    console.log("Expired");
                    localStorage.removeItem("token"); // Xóa token khi hết hạn
                    setUserId(0);
                } else {
                    setLogin(true);
                }
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, [isLogin]);
    const isAdminRoute = location.pathname.startsWith("/admin");

    // get order and order details by userId
    useEffect(() => {
        if (userId > 0) {
            getLatestOrderAndOrderDetailByUserId(userId)
                .then((response) => {
                    setLatestOrder(response.order);
                    setOrderDetails(response.orderDetailList);
                })
                .catch(() => {
                    // TH không có order trong DB
                    const order = new OrderModel();
                    const fetchAll = async () => {
                        const response = await createOrder(order);
                        setIsNewOder(true);
                        console.log(response);
                    };
                    fetchAll();
                    console.log("New order");
                });
        }
    }, [userId, isNewOrder]);

    const contextValue = {
        userId: userId,
        order: latestOrder,
        orderDetails: orderDetails,
        setUserId: setUserId,
    };

    return (
        <div className="App">
            <MyContext.Provider value={contextValue}>
                {!isAdminRoute && (
                    <Navbar
                        setKeyWord={setKeyWord}
                        isLogin={isLogin}
                        setLogin={setLogin}
                    />
                )}
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

                    <Route path="/cart" element={<CartList />} />

                    {/* ADMIN */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route
                        path="/admin/product-form"
                        element={<ProductForm />}
                    />
                    <Route path="/test" element={<Test />} />
                </Routes>
                {!isAdminRoute && <Footer />}
            </MyContext.Provider>
            <ToastContainer position="top-left" autoClose={2000} />
        </div>
    );
};

export default App;
