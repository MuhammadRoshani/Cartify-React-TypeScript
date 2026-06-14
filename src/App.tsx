import "./App.css";
import routes from "./routes";
import CartContextProvider from "./context/cartContext";
import { useRoutes } from "react-router-dom";
import Header from "./components/Header";

export default function App() {
  const router = useRoutes(routes);

  return (
    <>
      {" "}
      <CartContextProvider>
        <div className="app">
          <Header />
          {router}
          {/* Start Content */}

          {/* Finish Content */}

          <footer>
            <a target={"_blank"} href="https://sabzlearn.ir">
              Cartify • All rights reserved
            </a>
          </footer>
        </div>
      </CartContextProvider>
    </>
  );
}
