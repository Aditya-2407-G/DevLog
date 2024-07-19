import React, { useState } from "react";
import { Card, Input, Button, Spinner } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../../redux/user/userSlice";
import OAuth from "../../components/OAuth";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {loading, error: errorMessage} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log(email, password);
        e.preventDefault();

        try {
            dispatch(signInStart());

            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (data.success === false) {
                return dispatch(signInFailure(data.message));
            }
            if (res.ok && data.success !== false) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    const togglePasswordVisibility = () =>
        setIsPasswordVisible(!isPasswordVisible);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="max-w-md w-full mx-4 p-8 space-y-8 bg-white shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Sign In
                </h2>
                {errorMessage && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                            required
                            className="max-w-full"
                            classNames={{
                                input: "bg-transparent",
                                inputWrapper:
                                    "bg-gray-100 border-2 border-gray-300 hover:border-gray-400 focus:border-blue-500",
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            type={isPasswordVisible ? "text" : "password"}
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value.trim())}
                            required
                            className="max-w-full"
                            classNames={{
                                input: "bg-transparent",
                                inputWrapper:
                                    "bg-gray-100 border-2 border-gray-300 hover:border-gray-400 focus:border-blue-500",
                            }}
                            endContent={
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="focus:outline-none"
                                >
                                    {isPasswordVisible ? (
                                        <FaEyeSlash className="text-2xl text-gray-400" />
                                    ) : (
                                        <FaEye className="text-2xl text-gray-400" />
                                    )}
                                </button>
                            }
                        />
                    </div>
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full text-lg py-6"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner size="sm" color="white" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                    <OAuth/>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Not Joined Yet?
                        <Link
                            to="/signup"
                            className="text-blue-500 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}