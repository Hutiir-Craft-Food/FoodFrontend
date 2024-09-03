import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import Navbar from "../components/Navbar/Navbar";
import styles from "./App.module.scss";

const App = () => {
  return (
    <>
      <ErrorBoundary fallback={<NotFoundPage />}>
        <div className={styles.app}>
          <Header />
          <HomePage />
          <Footer />
        </div>
      </ErrorBoundary>

      <div className={styles.app}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/delivery-and-payment"
              element={<DeliveryAndPayment />}
            />
            <Route path="/manufacturers" element={<div>Manufacturers</div>} />
            <Route path="/cooperation" element={<div>Cooperation</div>} />
            <Route path="/blog" element={<div>Blog</div>} />
            <Route path="/about" element={<div>About</div>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
