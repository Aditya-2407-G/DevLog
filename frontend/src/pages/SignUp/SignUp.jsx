import React, { useState } from "react";
import { Card, Input, Button, Spinner } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OAuth from "../../components/OAuth";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            setLoading(true);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await res.json();

            if (data.success === false) {
                setErrorMessage("User Already Exists");
            }
            setLoading(false);
            if (res.ok) {
                navigate("/signin");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () =>
        setIsPasswordVisible(!isPasswordVisible);
    const toggleConfirmPasswordVisibility = () =>
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="max-w-md w-full mx-4 p-8 space-y-8 bg-white shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Sign Up
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
                            type="text"
                            label="Username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.trim())}
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
                    <div>
                        <Input
                            type={
                                isConfirmPasswordVisible ? "text" : "password"
                            }
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value.trim())
                            }
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
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="focus:outline-none"
                                >
                                    {isConfirmPasswordVisible ? (
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
                        disabled={loading || password !== confirmPassword}
                    >
                        {loading ? (
                            <>
                                <Spinner size="sm" color="white" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                    <OAuth/>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/signin"
                            className="text-blue-500 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
