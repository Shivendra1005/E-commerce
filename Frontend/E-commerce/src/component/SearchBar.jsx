import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const { showSearch, setShowSearch, searchText, setSearchText } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection") || location.pathname === "/") {
      setVisible(true);
      setShowSearch(true);
    } else {
      setVisible(false);
      setShowSearch(false);
    }
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] py-3 px-6 animate-slideDown">
      <div className="max-w-2xl mx-auto flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full px-5 py-2.5 focus-within:border-[var(--accent-primary)] focus-within:bg-[var(--bg-primary)] focus-within:shadow-[0_0_0_3px_var(--accent-focus)] transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 5.5 5.5a7.5 7.5 0 0 0 10.65 10.65z" />
          </svg>
          <input
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search products, categories…"
            autoFocus
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={() => { setShowSearch(false); setSearchText(""); }}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[var(--bg-secondary)] transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
