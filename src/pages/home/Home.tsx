import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import Card from "../../components/card/Card";

export default function Home() {
  const context = useContext(CartContext)!;

  if (context.loading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  return (
    <>
      <section>
        <p className="title">All Products:</p>
      </section>
      <img className="index-first-bg" src="/hero-gradient.svg" alt="" />
      <main className="main-index">
        {context.shop.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </main>
    </>
  );
}
