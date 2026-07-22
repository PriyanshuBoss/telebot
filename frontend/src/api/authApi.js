import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const registerUser = async (username, password) => {
    const res = await API.post("/auth/register", {
        username,
        password,
    });

    return res.data;
};

export const loginUser = async (username, password) => {
    const res = await API.post("/auth/login", {
        username,
        password,
    });

    return res.data;
};
