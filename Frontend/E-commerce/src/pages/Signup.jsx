import { Link, useNavigate } from "react-router-dom";
import { TopBar } from "../component/TopBar";
import axios from "axios";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const backendurl = import.meta.env.VITE_BACKEND_URL;

export function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { setToken } = useContext(ShopContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendurl}/api/user/signup`, {
                username,
                email,
                password
            });

            setToken(response.data.token);

            if (response.data.success) {
                navigate('/');
            } else {
                toast.error('Invalid credentials, please try again.');
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            toast.error(error.message)
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
            <section className="flex-1 w-full flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md animate-fadeIn">
                    <div className="bg-[var(--bg-primary)] rounded-3xl p-8 lg:p-10 shadow-[var(--shadow-md)] border border-[var(--border-color)]">
                        <div className="text-center mb-6">
                            <Link to="/" className="inline-flex items-center gap-2 mb-6">
                                <div className="w-9 h-9 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <line x1="3" y1="6" x2="21" y2="6" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M16 10a4 4 0 01-8 0" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-[var(--text-primary)]">
                                    NovaCart
                                </span>
                            </Link>
                            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Create an account</h1>
                            <p className="text-[var(--text-secondary)] text-sm">Join NovaCart for a premium shopping experience</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="input-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="your username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="input-label">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field"
                                    placeholder="example@gmail.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="input-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="input-checkbox"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="text-[var(--text-secondary)]">
                                        I accept the{" "}
                                        <a href="#" className="font-medium text-[var(--accent-primary)] hover:underline">Terms and Conditions</a>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full text-base py-3.5 rounded-xl shadow-lg shadow-[var(--accent-primary)]/20"
                            >
                                Sign Up
                            </button>

                            <p className="text-center text-sm text-[var(--text-secondary)]">
                                Already have an account?{" "}
                                <Link to="/signin" className="text-[var(--accent-primary)] font-semibold hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
