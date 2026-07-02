import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

// Inline SVG icons to eliminate local file dependency
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 5.5 5.5a7.5 7.5 0 0 0 10.65 10.65z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm8 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Collection", path: "/collection" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function TopBar() {
  const { setShowSearch, getCartCount, token, setToken, setCartItem } = useContext(ShopContext);

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("#profile-menu-wrapper")) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    setProfileMenuOpen(false);
    navigate("/signin");
  };

  const goToAdmin = () => {
    window.location.href = "https://e-commerce-5p5f.vercel.app/admin";
  };

  const cartCount = getCartCount();

  return (
    <>
      {/* ── MAIN NAV ───────────────────────────────── */}
      <header
        className={`navbar-glass h-16 sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-slate-200/60" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setMenuOpen(false)}
          >
            {/* SVG Logo Mark */}
            <img
              src="/icon.png"
              alt="NovaCart"
              className="h-10 w-10 object-contain"
            />

            <span
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300"
            >
              NovaCart
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {/* Admin Link */}
            <button
              onClick={goToAdmin}
              className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-indigo-200/60 hover:shadow-md"
            >
              Admin
            </button>
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-2">

            {/* Search */}
            <button
              onClick={() => { setShowSearch(true); navigate("/collection"); }}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-200"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* Profile dropdown */}
            <div className="relative" id="profile-menu-wrapper">
              <button
                onClick={() => setProfileMenuOpen((p) => !p)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-200"
                aria-label="Profile"
              >
                <UserIcon />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 z-50 animate-slideDown overflow-hidden">
                  {token ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <UserIcon />
                        My Profile
                      </Link>
                      <button
                        onClick={() => { navigate("/orders"); setProfileMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        My Orders
                      </button>
                      <div className="border-t border-slate-100" />
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/signin"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Login / Sign up
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-200"
              aria-label="Cart"
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none min-w-[18px] min-h-[18px] px-1">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-200"
              aria-label="Menu"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-16 animate-slideDown">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMenuOpen(false)}
          />
          {/* Menu Panel */}
          <div className="relative bg-white border-b border-slate-100 shadow-xl">
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-base font-medium rounded-xl transition-colors ${isActive
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <button
                onClick={goToAdmin}
                className="mt-2 px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors text-left"
              >
                Admin Panel
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default TopBar;
