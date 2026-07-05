import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import TopBar from '../component/TopBar';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/Footer';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export const Cart = () => {
  const { products, currency, cartItem, updateQuantity, token } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    if (!token) {
      navigate('/signup');
    } else {
      navigate('/place-order');
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItem, products]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-16 py-12 lg:py-16">
        <Title text1="YOUR" text2="CART" />

        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm8 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Your cart is empty</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-8">Looks like you haven't added anything yet.</p>
            <button onClick={() => navigate('/collection')} className="btn-primary">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-200"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[var(--bg-secondary)] flex-shrink-0">
                      <img
                        src={productData?.images[0]}
                        alt={productData?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--text-primary)] text-sm sm:text-base truncate">
                        {productData?.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span className="text-sm font-bold text-[var(--text-primary)]">
                          {currency}{productData?.price?.toLocaleString("en-IN")}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-medium border border-[var(--border-color)]">
                          Size: {item.size}
                        </span>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-1 bg-[var(--bg-secondary)] rounded-xl p-1 border border-[var(--border-color)]">
                      <button
                        onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <MinusIcon />
                      </button>
                      <input
                        onChange={(e) =>
                          e.target.value === "" || e.target.value === "0"
                            ? null
                            : updateQuantity(item._id, item.size, Number(e.target.value))
                        }
                        className="w-10 text-center text-sm font-semibold text-[var(--text-primary)] bg-transparent border-none outline-none"
                        type="number"
                        min={1}
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <PlusIcon />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="p-2.5 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:w-96 xl:w-[400px]">
              <div className="lg:sticky lg:top-24 space-y-5">
                <CartTotal />
                <button
                  onClick={handleCheckoutClick}
                  className="btn-primary w-full text-base py-4 rounded-xl shadow-lg shadow-[var(--accent-primary)]/20"
                >
                  Proceed to Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button
                  onClick={() => navigate('/collection')}
                  className="btn-outline w-full text-sm py-3.5 rounded-xl"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
