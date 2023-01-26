import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { Home } from "./components/Pages/Home/Home";
import { Products } from "./components/Pages/Products/Products";
import { Signin } from "./components/Pages/SignupOrSignin/Signin/Signin";
import { Signup } from "./components/Pages/SignupOrSignin/Signup/Signup";
import { AppContextProvider } from "./context/DogFoodContextProvider";
import { ProductsAll } from "./components/Pages/ProductsAll/ProductsAll";
import { ProductsPopular } from "./components/Pages/ProductsPopular/ProductsPopular";
import { PersonalAccount } from "./components/Pages/PersonalAccount/PersonalAccount";

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
        children: [
          {
            index: true,
            element: <ProductsAll />
          },
          {
            path: "popular",
            element: <ProductsPopular />
          },
          {
            path: "newly"
          },
          {
            path: "priceup"
          },
          {
            path: "pricedown"
          },
          {
            path: "rate"
          },
          {
            path: "benefit"
          }
        ]
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
        element: <PersonalAccount />
      }
    ]
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
