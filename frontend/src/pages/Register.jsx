import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const register = async (e) => {

        e.preventDefault();

        try {

            await registerUser(
                username,
                password
            );

            navigate("/");

        } catch {

            alert("Registration failed");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={register}
                className="bg-white p-8 rounded shadow w-96"
            >

                <h1 className="text-2xl font-bold mb-6">
                    Register
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
                    className="bg-green-600 text-white w-full py-2 rounded"
                >
                    Register
                </button>

                <p className="mt-4">

                    Already have an account?

                    <Link
                        to="/"
                        className="text-blue-600 ml-2"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );

}