import React from "react";
import ReactDOM from "react-dom/client";
import App, { loader as appLoader } from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import ManageFilm from "./components/ManageFilm.jsx";
import { addFilmLoader, editFilmLoader } from "./components/FilmForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/films/all"),
  },
  {
    path: "/films/:filter",
    element: <App />,
    loader: appLoader,
  },
  { path: "/films/add", element: <ManageFilm />, loader: addFilmLoader },
  { path: "/films/:id/edit", element: <ManageFilm />, loader: editFilmLoader },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
