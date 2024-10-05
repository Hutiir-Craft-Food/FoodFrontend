import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HomePage from "../pages/HomePge/HomePage";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import styles from "./App.module.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/delivery-and-payment",
        element: <h1>Доставка і оплата</h1>,
      },
      {
        path: "/manufacturers",
        element: <h1>Виробники</h1>,
      },
      {
        path: "/cooperation",
        element: <h1>Співпраця</h1>,
      },
      {
        path: "/blog",
        element: <h1>Блог</h1>,
      },
      {
        path: "/about",
        element: <h1>Про нас</h1>,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
