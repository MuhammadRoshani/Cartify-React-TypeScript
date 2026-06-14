import React, { createContext, useState, useEffect } from "react";
import type { CartProduct, Product } from "../components/Products.types";

type CartContextProviderProps = {
  children: React.ReactNode;
};

type CartContextType = {
  userCart: CartProduct[];
  addProduct: (id: number) => void;
  removeProduct: (id: number) => void;
  removeAll: () => void;
  shop: Product[];
  loading: boolean;
};

export const CartContext = createContext<CartContextType | null>(null);

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [userCart, setUserCart] = useState<CartProduct[]>([]);
  const [shop, setShop] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = (await res.json()) as Product[];
        setShop(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // addProduct func:
  const addProduct = (id: number) => {
    setUserCart((prevProducts) => {
      const mainProductInCart = prevProducts.find(
        (product) => product.id === id,
      );

      if (mainProductInCart) {
        return prevProducts.map((product) => {
          if (product.id === id) {
            return { ...product, count: product.count + 1 };
          } else {
            return product;
          }
        });
      } else {
        const mainProductInShop = shop.find(
          (product) => product.id === id,
        ) as Product;
        return [...prevProducts, { ...mainProductInShop, count: 1 }];
      }
    });
  };

  // removeProduct func:
  const removeProduct = (id: number) => {
    setUserCart((prevProduct) =>
      prevProduct.filter((product) => product.id !== id),
    );
  };

  // removeAll func:
  const removeAll = () => {
    setUserCart([]);
  };

  return (
    <CartContext.Provider
      value={{ addProduct, removeProduct, removeAll, userCart, shop, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
