import { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TopBar from "../component/TopBar";
import Footer from "../component/Footer";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { token, cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            `${backend_url}/api/order`,
            { orderData },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.data.success) {
            setCartItem({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const inputClass = "input-field";

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-16 py-12 lg:py-16">
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

            {/* LEFT: Delivery Form */}
            <div className="flex-1">
              <Title text1="DELIVERY" text2="INFORMATION" />

              <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] p-6 lg:p-8 shadow-[var(--shadow-sm)] space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">First Name *</label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="firstName"
                      value={formData.firstName}
                      className={inputClass}
                      type="text"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="input-label">Last Name *</label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="lastName"
                      value={formData.lastName}
                      className={inputClass}
                      type="text"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Email Address *</label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    className={inputClass}
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="input-label">Street Address *</label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="street"
                    value={formData.street}
                    className={inputClass}
                    type="text"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">City *</label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="city"
                      value={formData.city}
                      className={inputClass}
                      type="text"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="input-label">State</label>
                    <input
                      onChange={onChangeHandler}
                      name="state"
                      value={formData.state}
                      className={inputClass}
                      type="text"
                      placeholder="Maharashtra"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Zipcode *</label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="zipcode"
                      value={formData.zipcode}
                      className={inputClass}
                      type="number"
                      placeholder="400001"
                    />
                  </div>
                  <div>
                    <label className="input-label">Country *</label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="country"
                      value={formData.country}
                      className={inputClass}
                      type="text"
                      placeholder="India"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Phone Number *</label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="phone"
                    value={formData.phone}
                    className={inputClass}
                    type="number"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="lg:w-96 xl:w-[400px] space-y-6">
              <div className="lg:sticky lg:top-24 space-y-6">
                <CartTotal />

                {/* Payment Method */}
                <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] p-6 shadow-[var(--shadow-sm)]">
                  <Title text1="PAYMENT" text2="METHOD" />
                  <div className="space-y-3 mt-4">
                    <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${method === "cod" ? "border-[var(--accent-primary)] bg-[var(--accent-light)]" : "border-[var(--border-color)] hover:border-[var(--text-muted)]"}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={method === "cod"}
                        onChange={() => setMethod("cod")}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${method === "cod" ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]" : "border-[var(--border-color)]"}`}>
                        {method === "cod" && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[var(--text-primary)]">Cash on Delivery</p>
                          <p className="text-xs text-[var(--text-secondary)]">Pay when your order arrives</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="btn-primary w-full text-base py-4 rounded-xl shadow-lg shadow-[var(--accent-primary)]/20"
                >
                  <CheckIcon />
                  Place Order
                </button>

                <p className="text-center text-xs text-[var(--text-muted)] flex items-center justify-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout · 100% Safe & Encrypted
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};
