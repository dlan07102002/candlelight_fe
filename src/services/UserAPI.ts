import { jwtDecode } from "jwt-decode";
import RoleModel from "../models/RoleModel";
import UserModel from "../models/UserModel";
import requestBE from "./Request";
import { NavigateFunction } from "react-router-dom";

interface IUserResponse {
    res: UserModel[];
    totalPages: number;
    totalElements: number;
}

interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
    exp: number; // Add expiration timestamp if present in your JWT
}

export async function countUsers(): Promise<number> {
    let result = 0;
    const endpoint = `http://localhost:8080/users/search/countUsers`;
    await requestBE(endpoint).then((data) => (result = data));
    return result;
}

export async function getUserById(userId: number): Promise<UserModel> {
    const endpoint = `http://localhost:8080/users/${userId}`;
    let user = new UserModel();
    await requestBE(endpoint).then((data) => {
        user = data;
    });

    return user;
}

export async function getUsers(endpoint: string): Promise<IUserResponse> {
    const res: UserModel[] = [];

    const response = await requestBE(endpoint);
    const userList = response._embedded.users;

    // Get page state
    const totalPages: number = response.page.totalPages;
    const totalElements: number = response.page.totalElements;
    for (const user of userList) {
        res.push(user);
    }

    return { res: res, totalElements: totalElements, totalPages: totalPages };
}

export async function getUserRole(
    userId: number
): Promise<RoleModel[] | RoleModel> {
    let result: RoleModel[] = [];
    const endpoint = `http://localhost:8080/users/${userId}/roleList`;
    const response = await requestBE(endpoint);
    result = response._embedded.roles;
    return result;
}

export async function deleteUserById(
    userId: number,
    navigate: NavigateFunction
): Promise<boolean> {
    const endpoint = `http://localhost:8080/users/${userId}`;
    const token = localStorage.getItem("token");

    if (!token) {
        console.warn("No token found. Delete failed.");
        return false;
    }

    try {
        const decodedToken = jwtDecode<JwtPayload & { isAdmin?: boolean }>(
            token
        );

        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            console.warn("Token expired. Redirecting to login...");
            localStorage.removeItem("token");
            navigate("/login");
            return false;
        }

        if (!decodedToken.isAdmin) {
            console.warn(
                "User is not an admin. Redirecting to 403 error page..."
            );
            navigate("/403-error");
            return false;
        }

        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.info(`User with ID ${userId} deleted successfully.`);
            return true;
        } else {
            console.error(
                `Failed to delete user with ID ${userId}. Status: ${response.status}`
            );
            return false;
        }
    } catch (error) {
        console.error("An error occurred during the delete operation:", error);
        return false;
    }
}
export async function getUsersInPage(page: number): Promise<IUserResponse> {
    // endpoint: localhost:8080/products
    const endpoint: string = `http://localhost:8080/users?size=8&page=${page}`;

    return getUsers(endpoint);
}

// http://localhost:8080/users/search/existsByUsername%7B?username}

export async function isUsernameExist(
    username: string
): Promise<boolean | string> {
    const endpoint = `http://localhost:8080/users/search/existsByUsername?username=${username}`;
    try {
        const response = await requestBE(endpoint);

        return response;
    } catch (err) {
        throw new Error(`Error when checking username: ${err}`);
    }
}

export async function isEmailExists(email: string): Promise<boolean | string> {
    const endpoint = `http://localhost:8080/users/search/existsByEmail?email=${email}`;
    try {
        const response = await requestBE(endpoint);

        return response;
    } catch (err) {
        throw new Error(`Error when checking email: ${err}`);
    }
}

export async function register(user: UserModel): Promise<boolean> {
    const endpoint = `http://localhost:8080/account/register`;
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Methods": "POST, GET, PUT",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                gender: user.gender,
                orderAddress: user.orderAddress,
                deliveryAddress: user.deliveryAddress,
                isActivate: false,
                activeId: "",
            }),
        });
        if (response.ok) {
            response.json().then((res) => console.log(res));
            return true;
        } else {
            throw new Error("Registration failed");
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function login(username: string, password: string) {
    const endpoint = `http://localhost:8080/account/login`;
    try {
        await fetch(endpoint, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Methods": "POST, GET, PUT",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Invalid username or password");
                }
            })
            .then((data) => {
                // Successfully Login
                const { result } = data;
                // Store jwt token into localStorage
                localStorage.setItem("token", result);
            });
    } catch (error) {
        throw new Error("Invalid username or password");
    }
}
