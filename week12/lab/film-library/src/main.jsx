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
import { loader as filmsDataLoader } from "./pages/FilmList";
import { loader as editFilmLoader } from "./pages/FilmData";
import { action as filmFormAction } from "./components/FilmForm";
import { likeAction, rateAction, deleteAction } from "./pages/InlineEditAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/films" />,
    errorElement: <NotFound />,
  },
  {
    path: "/films",
    element: <App />,
    loader: appLoader,
    errorElement: <NotFound />,
    children: [
      {
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <FilmList />,
            loader: filmsDataLoader,
          },
          {
            path: ":filter",
            element: <FilmList />,
            loader: filmsDataLoader,
          },
        ],
      },
    ],
  },
  {
    path: "/films/add",
    element: <FilmData />,
    errorElement: <NotFound />,
    loader: editFilmLoader,
    action: filmFormAction,
  },
  {
    path: "/films/edit/:id",
    element: <FilmData />,
    errorElement: <NotFound />,
    loader: editFilmLoader,
    action: filmFormAction,
  },
  {
    path: "/films/like/:id",
    action: likeAction,
  },
  {
    path: "/films/rate/:id",
    action: rateAction,
  },
  {
    path: "/films/delete/:id",
    action: deleteAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
