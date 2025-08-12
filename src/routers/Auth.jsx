// eslint-disable-next-line no-unused-vars
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const Test = lazy(() =>
  import("../components/TestComponent/TestComponent").then((module) => ({
    default: module.TestComponent,
  }))
);
const NotFoundPage = React.lazy(() =>
  import("../pages/NotFoundPage/NotFoundPage")
);
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Introduce = lazy(() => import("../pages/Introduce/Introduce"));
const Products = lazy(() => import("../pages/Products/Products"));
const Services = lazy(() => import("../pages/Services/Services"));
const Contact = lazy(() => import("../pages/Contact/Contact"));

const Auth = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div></div>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="/gioi-thieu"
        element={
          <Suspense fallback={<div></div>}>
            <Introduce />
          </Suspense>
        }
      />
      <Route
        path="/san-pham"
        element={
          <Suspense fallback={<div></div>}>
            <Products />
          </Suspense>
        }
      />
      <Route
        path="/dich-vu"
        element={
          <Suspense fallback={<div></div>}>
            <Services />
          </Suspense>
        }
      />
      <Route
        path="/lien-he"
        element={
          <Suspense fallback={<div></div>}>
            <Contact />
          </Suspense>
        }
      />
    </Routes>
    
  );
};

export default Auth;
