import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ProductItem } from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (product) =>
          product.category === category && product.subCategory === subCategory
      );
      setRelatedProducts(filtered);
    }
  }, [category, subCategory, products]);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-20 lg:mt-24">
      <div className="text-center mb-10 lg:mb-12">
        <span className="section-tag">You Might Also Like</span>
        <h2 className="section-title">Related Products</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {relatedProducts.map((product, index) => (
          <div
            key={product._id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
          >
            <ProductItem
              productId={product._id}
              name={product.name}
              image={product.images[0]}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
