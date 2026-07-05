import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

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

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm8 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
  </svg>
);

const BoxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearch(true);
      navigate("/collection");
    }
  };

  const cartCount = getCartCount();

  return (
    <>
      <header
        className={`navbar h-18 min-h-[72px] transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-16">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/icon.png"
              alt="NovaCart"
              className="h-10 w-10 object-contain"
            />
            <span
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-xl font-bold text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent-primary)] transition-colors duration-300"
            >
              NovaCart
            </span>
          </Link>

          {/* SEARCH BAR - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-md mx-8 lg:mx-12"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-11 pl-5 pr-12 text-sm bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 focus:border-[var(--accent-primary)] focus:bg-[var(--bg-primary)] focus:shadow-[0_0_0_3px_var(--accent-focus)]"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-light)] rounded-full transition-all duration-200"
                aria-label="Search"
              >
                <SearchIcon />
              </button>
            </div>
          </form>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-1 lg:gap-1.5">
            {/* Search - Mobile */}
            <button
              onClick={() => { setShowSearch(true); navigate("/collection"); }}
              className="md:hidden p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-all duration-200"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* Wishlist */}
            <button
              className="hidden sm:flex p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-all duration-200"
              aria-label="Wishlist"
            >
              <HeartIcon />
            </button>

            {/* Orders */}
            <button
              onClick={() => navigate("/orders")}
              className="hidden sm:flex p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-all duration-200"
              aria-label="Orders"
            >
              <BoxIcon />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-all duration-200"
              aria-label="Cart"
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[var(--accent-primary)] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 leading-none shadow-sm">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Profile dropdown */}
            <div className="relative" id="profile-menu-wrapper">
              <button
                onClick={() => setProfileMenuOpen((p) => !p)}
                className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-all duration-200"
                aria-label="Profile"
              >
                <UserIcon />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl shadow-[var(--shadow-lg)] z-50 animate-slideDown overflow-hidden">
                  {token ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                      >
                        <UserIcon />
                        My Profile
                      </Link>
                      <button
                        onClick={() => { navigate("/orders"); setProfileMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors text-left"
                      >
                        <BoxIcon />
                        My Orders
                      </button>
                      <div className="border-t border-[var(--border-color)]" />
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-[var(--error)] hover:bg-[var(--error-bg)] transition-colors text-left"
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
                      className="flex items-center gap-3 px-4 py-3.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      <UserIcon />
                      Sign In / Register
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-all duration-200"
              aria-label="Menu"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-18 animate-slideDown">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative bg-[var(--bg-primary)] border-b border-[var(--border-color)] shadow-[var(--shadow-lg)]">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="px-5 pt-4 pb-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-11 pl-5 pr-12 text-sm bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 focus:border-[var(--accent-primary)] focus:bg-[var(--bg-primary)] focus:shadow-[0_0_0_3px_var(--accent-focus)]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-primary)] rounded-full transition-all duration-200"
                  aria-label="Search"
                >
                  <SearchIcon />
                </button>
              </div>
            </form>

            <nav className="px-5 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                      isActive
                        ? "text-[var(--accent-primary)] bg-[var(--accent-light)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="border-t border-[var(--border-color)] my-2" />
              <button
                onClick={() => { goToAdmin(); setMenuOpen(false); }}
                className="w-full px-4 py-3 text-base font-semibold text-white bg-[var(--accent-primary)] rounded-xl hover:bg-[var(--accent-primary-hover)] transition-colors text-left"
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
