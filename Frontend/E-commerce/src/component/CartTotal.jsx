import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] p-6 shadow-[var(--shadow-sm)]">
      <Title text1="CART" text2="TOTALS" />

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between items-center text-[var(--text-secondary)]">
          <span>Subtotal</span>
          <span className="font-semibold text-[var(--text-primary)]">{currency}{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="border-t border-[var(--border-color)]" />
        <div className="flex justify-between items-center text-[var(--text-secondary)]">
          <span>Shipping Fee</span>
          <span className={`font-semibold ${subtotal === 0 ? "text-[var(--text-muted)]" : "text-[var(--text-primary)]"}`}>
            {subtotal === 0 ? "—" : `${currency}${delivery_fee}`}
          </span>
        </div>
        <div className="border-t border-[var(--border-color)]" />
        <div className="flex justify-between items-center pt-1">
          <span className="text-base font-bold text-[var(--text-primary)]">Total</span>
          <span className="text-xl font-bold text-[var(--accent-primary)]">
            {currency}{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
