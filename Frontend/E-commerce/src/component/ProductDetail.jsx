import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleProduct } from "../api/api";
import { TopBar } from "./TopBar";
import Footer from "./Footer";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import RelatedProducts from "../component/RelatedProduct";
import { toast } from "react-toastify";
import { Spinner } from "./Spinner";

const dummyRating = 4;
const dummyReviewsCount = 122;

const CartPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M12 17v4m-2-2h4" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg className={`w-4 h-4 ${filled ? "text-amber-400" : "text-[var(--border-color)]"}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    if (!productId) {
      setError("Product not found");
      setLoading(false);
      return;
    }
    getSingleProduct(productId)
      .then((data) => {
        setProduct(data);
        setImage(data.images[0]);
      })
      .catch(() => setError("Failed to fetch product details"))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Spinner />
          <p className="text-[var(--text-muted)] text-sm">Loading product…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <div className="flex-1 flex items-center justify-center text-[var(--error)] text-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      {product && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-16 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 animate-fadeIn">
            {/* Image Gallery */}
            <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px]">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setImage(img)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      image === img
                        ? "border-[var(--accent-primary)] shadow-md shadow-[var(--accent-light)]"
                        : "border-[var(--border-color)] hover:border-[var(--text-muted)]"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 aspect-square sm:aspect-auto sm:max-h-[500px] bg-[var(--bg-secondary)] rounded-2xl overflow-hidden">
                <img
                  key={image}
                  src={image}
                  alt={product.name}
                  className="w-full h-full object-cover animate-fadeIn"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 lg:max-w-lg space-y-6">
              {/* Category */}
              <span className="inline-flex px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent-primary)] text-xs font-semibold uppercase tracking-wider">
                {product.category} · {product.subCategory}
              </span>

              {/* Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < dummyRating} />
                  ))}
                </div>
                <span className="text-sm text-[var(--text-secondary)]">({dummyReviewsCount} Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 flex-wrap">
                <p className="text-3xl font-bold text-[var(--text-primary)]">
                  ₹{product.price?.toLocaleString("en-IN")}
                </p>
                <p className="text-lg text-[var(--text-muted)] line-through">
                  ₹{Math.round(product.price * 1.3).toLocaleString("en-IN")}
                </p>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold">
                  23% OFF
                </span>
              </div>

              {/* Description */}
              <p className="text-[var(--text-secondary)] leading-relaxed">{product.description}</p>

              {/* Size Selection */}
              {product.size && product.size.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">Select Size</p>
                    <button className="text-xs text-[var(--accent-primary)] hover:underline font-medium">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.size.map((sizeOption) => (
                      <button
                        key={sizeOption}
                        onClick={() => setSelectedSize(sizeOption)}
                        className={`px-5 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                          selectedSize === sizeOption
                            ? "bg-[var(--text-primary)] text-white border-[var(--text-primary)] shadow-md"
                            : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                        }`}
                      >
                        {sizeOption}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product._id, selectedSize)}
                className="btn-primary w-full text-base py-4 rounded-xl gap-3 shadow-lg shadow-[var(--accent-primary)]/20"
              >
                <CartPlusIcon />
                Add to Cart — ₹{product.price?.toLocaleString("en-IN")}
              </button>

              {/* Trust Badges */}
              <div className="border-t border-[var(--border-color)] pt-6 space-y-3">
                {[
                  { icon: "✓", text: "100% Original product" },
                  { icon: "✓", text: "Cash on delivery available" },
                  { icon: "✓", text: "Easy returns & exchange within 7 days" },
                ].map((item, i) => (
                  <p key={i} className="text-sm text-[var(--text-secondary)] flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {item.icon}
                    </span>
                    {item.text}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <RelatedProducts
            category={product.category}
            subCategory={product.subCategory}
          />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetail;
