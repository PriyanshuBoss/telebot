import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser(
                username,
                password
            );

            localStorage.setItem(
                "token",
                data.access_token
            );

            navigate("/chat");

        } catch {

            alert("Invalid credentials");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded shadow w-96"
            >

                <h1 className="text-2xl font-bold mb-6">
                    Login
                </h1>

                <input
                    className="border w-full p-2 mb-4"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <input
                    type="password"
                    className="border w-full p-2 mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="bg-blue-600 text-white w-full py-2 rounded"
                >
                    Login
                </button>

                <p className="mt-4">

                    Don't have an account?

                    <Link
                        className="text-blue-600 ml-2"
                        to="/register"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>

    );

}