import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const backendurl = import.meta.env.VITE_BACKEND_URL;

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(`${backendurl}/api/user/signin`, { email, password });
      setToken(response.data.token);
      if (response.data.success) {
        navigate("/");
        toast.success("Welcome back!");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)]">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/80 via-slate-900/60 to-black/50" />
        <div className="relative z-10 flex flex-col justify-between p-12 h-full">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white">
              NovaCart
            </span>
          </Link>
          <div>
            <blockquote className="text-white/90 text-2xl font-light leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              "Style is a way to say who you are without having to speak."
            </blockquote>
            <p className="text-white/50 text-sm">— Rachel Zoe</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[var(--bg-primary)]">
        <div className="w-full max-w-md animate-fadeIn">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-[var(--text-primary)] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-[var(--text-primary)]">
              NovaCart
            </span>
          </Link>

          <div className="bg-[var(--bg-primary)] rounded-3xl p-8 lg:p-10 shadow-[var(--shadow-md)] border border-[var(--border-color)]">
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Welcome back</h1>
            <p className="text-[var(--text-secondary)] text-sm mb-8">Sign in to continue shopping</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="input-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="input-field"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="input-label">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    className="input-field pr-11"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" id="remember" className="input-checkbox" />
                  <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[var(--accent-primary)] hover:underline font-medium">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-base py-3.5 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[var(--accent-primary)]/20"
              >
                {submitting ? "Signing in…" : "Sign In"}
              </button>

              <p className="text-center text-sm text-[var(--text-secondary)]">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[var(--accent-primary)] font-semibold hover:underline">
                  Create account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
