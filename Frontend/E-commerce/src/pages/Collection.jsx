import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { TopBar } from "../component/TopBar";
import { ProductItem } from "../component/ProductItem";
import Footer from "../component/Footer";
import SearchBar from "../component/SearchBar";
import { Spinner } from "../component/Spinner";

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export function Collection() {
  const { products, searchText, showSearch, loading } = useContext(ShopContext);

  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const selectCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const selectSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relavent");
    setPriceRange([0, 50000]);
    setShowFilters(false);
  };

  const hasActiveFilters = category.length > 0 || subCategory.length > 0 || sortType !== "relavent";

  useEffect(() => {
    let filtered = [...products];

    if (showSearch && searchText.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [products, category, subCategory, searchText, showSearch, sortType, priceRange]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <SearchBar />

      <main className="flex-1 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8 lg:py-12">
          {loading ? (
            <div className="flex justify-center items-center gap-7 h-96">
              <Spinner />
              <p className="text-[var(--text-muted)]">Loading...</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* FILTER SIDEBAR */}
              <aside
                className={`lg:w-72 flex-shrink-0 ${
                  showFilters ? "fixed inset-0 z-50 flex flex-col bg-[var(--bg-primary)]" : "hidden"
                } lg:block lg:relative lg:z-auto`}
              >
                {showFilters && (
                  <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)] lg:hidden">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
                    >
                      <XIcon />
                    </button>
                  </div>
                )}

                <div className="lg:sticky lg:top-24 space-y-5 p-5 lg:p-0 lg:overflow-y-auto lg:max-h-[calc(100vh-8rem)]">
                  {/* Categories */}
                  <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] p-5 lg:p-6 shadow-[var(--shadow-sm)]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Categories</h4>
                    </div>
                    <div className="space-y-3">
                      {["Men", "Women", "Kids"].map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={category.includes(item)}
                            onChange={() => selectCategory(item)}
                            className="input-checkbox"
                          />
                          <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Type */}
                  <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] p-5 lg:p-6 shadow-[var(--shadow-sm)]">
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">Type</h4>
                    <div className="space-y-3">
                      {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={subCategory.includes(item)}
                            onChange={() => selectSubCategory(item)}
                            className="input-checkbox"
                          />
                          <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="w-full py-3 text-sm font-semibold text-[var(--accent-primary)] bg-[var(--accent-light)] rounded-xl hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-200"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </aside>

              {/* MOBILE FILTER OVERLAY */}
              {showFilters && (
                <div
                  className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                  onClick={() => setShowFilters(false)}
                />
              )}

              {/* PRODUCTS + TOP BAR */}
              <div className="flex-1 min-w-0">
                {/* Sort + Filter Bar */}
                <div className="flex items-center justify-between mb-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] p-4 shadow-[var(--shadow-sm)]">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg lg:text-xl font-bold text-[var(--text-primary)]">
                      All <span className="text-[var(--text-muted)]">Collections</span>
                    </h2>
                    <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2.5 py-1 rounded-full font-medium">
                      {filterProducts.length} items
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Mobile filter toggle */}
                    <button
                      onClick={() => setShowFilters(true)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
                    >
                      <FilterIcon />
                      Filters
                      {hasActiveFilters && (
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                      )}
                    </button>

                    {/* Sort */}
                    <select
                      value={sortType}
                      onChange={(e) => setSortType(e.target.value)}
                      className="select-field bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_var(--accent-focus)] transition-all cursor-pointer"
                    >
                      <option value="relavent">Relevant</option>
                      <option value="low-high">Price: Low to High</option>
                      <option value="high-low">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filterProducts.length > 0 ? (
                    filterProducts.map((item) => (
                      <div
                        key={item._id}
                        className="animate-fadeIn"
                        style={{ animationDelay: "0ms", animationFillMode: "both" }}
                      >
                        <ProductItem
                          productId={item._id}
                          name={item.name}
                          price={item.price}
                          image={item.images[0]}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-[var(--text-muted)] text-lg font-medium">No products found</p>
                      <p className="text-[var(--text-muted)] text-sm mt-1">Try adjusting your filters</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
