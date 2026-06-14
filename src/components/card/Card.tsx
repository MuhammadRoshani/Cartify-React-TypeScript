import "./Card.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import type { Product } from "../Products.types";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Swal from "sweetalert2";

export default function Card({ image, title, price, rating, id }: Product) {
  const context = useContext(CartContext)!;
  const navigate = useNavigate();

  const addToBasketHandler = () => {
    context.addProduct(id);
    Swal.fire({
      title: "The selected product has been added to the shopping cart",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Go to cart",
      cancelButtonText: `OK`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/cart");
      }
    });
  };

  return (
    <>
      <div className="card">
        <img src={image} alt="" />
        <main>
          <p>{title.slice(0, 20)} ...</p>
          <div className="card-details">
            <div>
              {Array(Math.ceil(rating.rate))
                .fill(0)
                .map((_, index) => (
                  <AiFillStar
                    key={`full-${index}`}
                    style={{ color: "orange" }}
                  />
                ))}

              {Array(5 - Math.ceil(rating.rate))
                .fill(0)
                .map((_, index) => (
                  <AiOutlineStar
                    key={`empty-${index}`}
                    style={{ color: "orange" }}
                  />
                ))}
            </div>
            <p>{price}$</p>
          </div>
          <button onClick={addToBasketHandler}>Add to Basket</button>
        </main>
      </div>
    </>
  );
}
