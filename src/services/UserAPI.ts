import UserModel from "../models/UserModel";
import requestBE from "./Request";

interface UserInterface {
    res: UserModel[];
}
async function getUsers(endpoint: string): Promise<UserInterface> {
    const res: UserModel[] = [];
    const response = await requestBE(endpoint);
    const userList = response._embedded.users;
    for (const key in userList) {
        const element: UserModel = userList[key];

        res.push(element);
    }

    return { res: res };
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
        const response = await fetch(endpoint, {
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
                const { jwt } = data;
                // Store jwt token into localStorage
                localStorage.setItem("token", jwt);
            });
    } catch (error) {
        throw new Error("Invalid username or password");
    }
}
