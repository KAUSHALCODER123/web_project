import { Route, Routes, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import CheckoutPage from "./pages/CheckoutPage";
import DetailPage from "./pages/DetailPage";
import ProductsProvider from "./contexts/ProductsProvider";
import CartProvider from "./contexts/CartProvider";
import AuthenticateProvider from "./contexts/AuthenticateProvider";
import Layout from "./layout/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

function App() {
  
  return (
    <>
    <AuthenticateProvider>
      <CartProvider>
        <ProductsProvider>
          <Layout>
            <Routes>
              <Route
                index
                path="/home"
                element={<Navigate to="/" replace />}
              />
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<DetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/*" element={<NotFound />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/login" element={<Login />} />
            </Routes>
          </Layout>
        </ProductsProvider>
      </CartProvider>
    </AuthenticateProvider>
      <Toaster
        toastOptions={{
          style: { color: "#ffffff", backgroundColor: "#262626" },
        }}
      />
    </>
  );
}

export default App;
