import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";

export default function Header() {
  const cart = useContext(CartContext)!;
  return (
    <header>
      <Link className="logo" to="/">
        Cartify
      </Link>
      <Link to="/cart">
        <AiOutlineShoppingCart className="shop-icon" />
        <span>{cart.userCart.length}</span>
      </Link>
    </header>
  );
}
