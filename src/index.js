import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Home } from './components/Pages/Home/Home';
import { Products } from './components/Pages/Products/Products';
import { Signin } from './components/Pages/SignupOrSignin/Signin/Signin';
import { Signup } from './components/Pages/SignupOrSignin/Signup/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "signin",
        element: <Signin />
      },
      {
        path: "signup",
        element: <Signup />
      }
    ]
  }
], { basename: "/sber-dogFood" });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
