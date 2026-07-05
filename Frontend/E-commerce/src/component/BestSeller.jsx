import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ProductItem } from "./ProductItem";
import { Spinner } from "./Spinner";

export function BestSeller() {
  const [bestSeller, setBestSeller] = useState([]);
  const { products, loading } = useContext(ShopContext);

  useEffect(() => {
    if (Array.isArray(products)) {
      const bestProduct = products.filter((item) => item.bestSeller);
      setBestSeller(bestProduct.reverse());
    }
  }, [products]);

  return (
    <section className="section-spacing px-6 lg:px-16 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <span className="section-tag">Top Picks</span>
          <h2 className="section-title mb-4">Best Sellers</h2>
          <p className="section-subtitle">
            Our most-loved products, top-rated by customers for quality, style and value.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center gap-4 py-20">
            <Spinner />
            <p className="text-[var(--text-muted)] text-sm">Loading products…</p>
          </div>
        ) : bestSeller.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-6">
            {bestSeller.map((item, index) => (
              <div
                key={item._id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
              >
                <ProductItem
                  image={item.images[0]}
                  name={item.name}
                  price={item.price}
                  productId={item._id}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--text-muted)] py-20">No best sellers yet.</p>
        )}
      </div>
    </section>
  );
}
