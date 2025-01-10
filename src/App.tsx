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

import { jwtDecode, JwtPayload } from "jwt-decode";
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
import PermissionDenied from "./layouts/error/403Error";
import Authenticate from "./layouts/user/Authenticate";

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
    const [currentPage, setCurrentPage] = useState(1);

    const location = useLocation();

    const checkUserToken = (token: string | null) => {
        if (token) {
            try {
                const decodedToken = jwtDecode<
                    JwtPayload & { rvCnt?: number; uid: number }
                >(token);

                setUserId(decodedToken.uid);
                localStorage.setItem(
                    "isNew",
                    decodedToken.rvCnt !== 0 ? "false" : "true"
                );

                const exp = decodedToken.exp ? decodedToken.exp * 1000 : 0;
                if (decodedToken.exp && Date.now() > exp) {
                    localStorage.removeItem("token");
                    setUserId(0);
                } else {
                    setLogin(true);
                }
            } catch (error) {
                console.error("Invalid token:", error);
            }
        } else {
            localStorage.setItem("isNew", "true");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        checkUserToken(token);
    }, [isLogin]);

    const isAdminRoute = location.pathname.startsWith("/admin");

    // Lấy thông tin đơn hàng và chi tiết đơn hàng
    const fetchOrderData = async (userId: number) => {
        try {
            const response = await getLatestOrderAndOrderDetailByUserId(userId);
            setLatestOrder(response.order);
            setOrderDetails(response.orderDetailList);
        } catch (error) {
            console.log("No orders found. Creating a new order...");
            const order = new OrderModel();
            await createOrder(order);
            setIsNewOder(true);
        }
    };

    useEffect(() => {
        if (userId > 0) {
            fetchOrderData(userId);
        }
    }, [userId, isNewOrder]);

    const contextValue = {
        userId,
        order: latestOrder,
        orderDetails,
        setUserId,
    };

    return (
        <div className="App">
            <MyContext.Provider value={contextValue}>
                {!isAdminRoute && (
                    <Navbar
                        setKeyWord={setKeyWord}
                        isLogin={isLogin}
                        setLogin={setLogin}
                        setCurrentPage={setCurrentPage}
                    />
                )}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePage
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                keyword={keyword}
                            />
                        }
                    />
                    <Route
                        path="/:categoryId"
                        element={
                            <HomePage
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                keyword={keyword}
                            />
                        }
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
                    <Route
                        path="/authenticate"
                        element={
                            <Authenticate
                                isLogin={isLogin}
                                setLogin={setLogin}
                            />
                        }
                    />
                    {/* ADMIN */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/test" element={<Test />} />
                    {/* ERROR */}
                    <Route path="/403-error" element={<PermissionDenied />} />
                </Routes>
                {!isAdminRoute && <Footer />}
            </MyContext.Provider>
            <ToastContainer position="top-left" autoClose={2000} />
        </div>
    );
};

export default App;
