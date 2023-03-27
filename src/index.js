import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import App from "./App";
import { Home } from "./components/Pages/Home/Home";
import { Products } from "./components/Pages/Products/Products";
import { Signin } from "./components/Pages/SignupOrSignin/Signin/Signin";
import { Signup } from "./components/Pages/SignupOrSignin/Signup/Signup";
import { Profile } from "./components/Pages/Profile/Profile";
import { store } from "./redux/store";
import { Cart } from "./components/Pages/Cart/Cart";
import { Favorites } from "./components/Pages/Favorites/Favorites";
import { ProductDetail } from "./components/Pages/ProductDetail/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products/",
        element: <Products />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "persona",
        element: <Profile />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "favorites",
        element: <Favorites />
      },
      {
        path: "products/:productId",
        element: <ProductDetail />
      }
    ]
  }
], { basename: "/sber-dogFood" });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
