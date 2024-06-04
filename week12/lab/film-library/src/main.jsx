import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import FilmList from "./pages/FilmList.jsx";
import FilmData from "./pages/FilmData.jsx";
import { loader as appLoader } from "./App";
import { loader as filmDataLoader } from "./pages/FilmData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/films" />,
    errorElement: <NotFound />,
  },
  {
    path: "/films",
    element: <App />,
    errorElement: <NotFound />,
    loader: appLoader,
    children: [
      {
        index: true,
        element: <FilmList />,
        loader: appLoader,
      },
      {
        path: ":filter",
        element: <FilmList />,
        loader: appLoader,
      },
    ],
  },
  {
    path: "/films/add",
    element: <FilmData />,
    errorElement: <NotFound />,
    loader: filmDataLoader,
  },
  {
    path: "/films/edit/:id",
    element: <FilmData />,
    errorElement: <NotFound />,
    loader: filmDataLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
