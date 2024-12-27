// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    uid: number;
    exp: number;
    rvCnt?: number;
}

export const useAuth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState<number>(0);
    const [isNew, setIsNew] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = jwtDecode<JwtPayload & { rvCnt?: number }>(
                    token
                );
                setUserId(decodedToken.uid);

                const isNewUser = decodedToken.rvCnt !== 0;
                setIsNew(isNewUser);
                localStorage.setItem("isNew", isNewUser ? "false" : "true");

                const exp = decodedToken.exp * 1000;
                if (Date.now() > exp) {
                    console.log("Token expired");
                    localStorage.removeItem("token");
                    setUserId(0);
                    setIsLogin(false);
                } else {
                    setIsLogin(true);
                }
            } catch (error) {
                console.error("Invalid token:", error);
            }
        } else {
            setIsNew(true);
        }
    }, [isLogin]);

    return { isLogin, userId, setIsLogin, setUserId, isNew };
};
