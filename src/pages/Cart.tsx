import "./Cart.css";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { AiFillStar, AiOutlineDelete, AiOutlineStar } from "react-icons/ai";

export default function Cart() {
  const context = useContext(CartContext)!;
  return (
    <>
      {context.userCart.length !== 0 ? ( // if shoppping cart is not empty
        <>
          <section className="cart-topbar">
            <p className="title">All Products In Basket:</p>
            <button onClick={context.removeAll}>
              Remove All Product <AiOutlineDelete className="delete-icon" />
            </button>
          </section>
          <main className="card-index">
            {context.userCart.map((product) => (
              <div key={product.id} className="card">
                <img src={product.image} alt="" />
                <main>
                  <p>{product.title.slice(0, 20)} ...</p>
                  <div className="card-details">
                    <div>
                      {Array(Math.ceil(product.rating.rate))
                        .fill(0)
                        .map((_, index) => (
                          <AiFillStar
                            key={`full-${product.id}-${index}`}
                            style={{ color: "orange" }}
                          />
                        ))}

                      {Array(5 - Math.ceil(product.rating.rate))
                        .fill(0)
                        .map((_, index) => (
                          <AiOutlineStar
                            key={`empty-${product.id}-${index}`}
                            style={{ color: "orange" }}
                          />
                        ))}
                    </div>
                    <p>{product.price}$</p>
                  </div>
                  <div className="product-count">
                    <p>Count: {product.count}</p>
                  </div>
                  <button onClick={() => context.removeProduct(product.id)}>
                    Remove From Basket
                  </button>
                </main>
              </div>
            ))}
          </main>
        </>
      ) : (
        <div className="emptyBasket">
          <img src="/empty.webp" alt="" />
          <p>Your Basket Is Empty 🛒 :((</p>
        </div>
      )}
    </>
  );
}
