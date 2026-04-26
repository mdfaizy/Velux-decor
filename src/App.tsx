// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AiAgentMobile } from "./screens/AiAgentMobile";
// import Products from "./screens/Products/Product";
// import Dashboard from "./components/screens/dashboard/Dashboard";
// import Signup from "./components/auth/Signup";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Main Landing / AI Interface */}
//         <Route path="/" element={<AiAgentMobile />} />

//         {/* Products Listing */}
//         <Route path="/products" element={<Products />} />
// <Route path="/signup" element={<Signup />} />
//  <Route path="/dashboard" element={<Dashboard />} />
//         {/* Catch-all route (Optional): Redirects to home if path doesn't exist */}
//         <Route path="*" element={<AiAgentMobile />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import { AiAgentMobile } from "./screens/AiAgentMobile";
// import Dashboard from "./components/screens/dashboard/Dashboard";


// import Signup from "./pages/auth/Signup";
// import UserListPage from "./pages/auth/UserListPage";
// import CategoryList from "./pages/category/CategoryList";
// import ProductList from "./pages/products/ProductList";
// import CreateCategory from "./pages/category/CreateCategory";
// import CreateProduct from "./pages/products/CreateProduct";
// import ConsultationList from "./pages/consultation/ConsultationList";


// function App() {
//   return (
//     <Router>
//       <Routes>

//         {/* Landing Page */}
//         <Route path="/" element={<AiAgentMobile />} />

//         {/* Dashboard */}
//         <Route path="/dashboard" element={<Dashboard />}>
//           {/* <Route index element={<OverviewPage />} /> */}
//           {/* <Route path="overview" element={<OverviewPage />} /> */}
//           <Route path="signup" element={<Signup />} />
//           <Route path="users" element={<UserListPage />} />
//          <Route path="categories" element={<CategoryList />} />
// <Route path="category" element={<CreateCategory />} />

// <Route path="/dashboard/consultations" element={<ConsultationList />} />

// <Route path="products" element={<ProductList />} />
// <Route path="product" element={<CreateProduct />} />
//           <Route path="/dashboard/categories" element={<CategoryList />} />
// <Route path="/dashboard/products" element={<ProductList />} />
//         </Route>

//         {/* fallback */}
//         <Route path="*" element={<Navigate to="/" />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AiAgentMobile } from "./screens/AiAgentMobile";
import Dashboard from "./components/screens/dashboard/Dashboard";

import Signup from "./pages/auth/Signup";
import UserListPage from "./pages/auth/UserListPage";

import CategoryList from "./pages/category/CategoryList";
import CreateCategory from "./pages/category/CreateCategory";

import ProductList from "./pages/products/ProductList";
import CreateProduct from "./pages/products/CreateProduct";

import ConsultationList from "./pages/consultation/ConsultationList";

// 🔥 REVIEW IMPORT
import ReviewList from "./pages/review/ReviewList";
import CreateReview from "./pages/review/CreateReview";
import PublicLayout from "./screens/layouts/PublicLayout";
import {FeaturedProducts} from "./screens/AiAgentMobile/FeaturedProducts";
import Services from "./screens/AiAgentMobile/Services";
import Login from "./pages/auth/Login";
import { Contact } from "./screens/AiAgentMobile/Contact";
// import {BookingModal} from './screens/AiAgentMobile/BookingModal'
import PrivateRoute from "./pages/auth/PrivateRoute";
import OpenRoute from "./pages/auth/OpenRoute"
import { Showroom } from "./screens/AiAgentMobile/Showroom";
import { ShowroomForm } from "./screens/AiAgentMobile/ShowroomForm";
function App() {
  return (
    <Router>
      <Routes>

        {/* Landing */}
        {/* <Route path="/" element={<AiAgentMobile />} />
<Route path="/featured-products" element={<FeaturedProducts />} />

*/}

<Route element={<PublicLayout />}>

    <Route path="/" element={<AiAgentMobile />} />
    <Route path="/featured-products" element={<FeaturedProducts />} />
    <Route path='/services-s' element={<Services/>}/>
    <Route
      path="/login"
      element={
        <OpenRoute>
          <Login />
        </OpenRoute>
      }
    />
    <Route path='/contact' element={<Contact/>}/>
<Route path="showroom-video" element={<Showroom />} />
  </Route>

        {/* Dashboard */}
        <Route path="/dashboard" element={<PrivateRoute>
      <Dashboard />
    </PrivateRoute>}>

          {/* DEFAULT */}
          <Route index element={<Navigate to="products" />} />

          {/* USERS */}
          <Route path="signup" element={<Signup />} />
          <Route path="users" element={<UserListPage />} />

          {/* CATEGORY */}
          <Route path="categories" element={<CategoryList />} />
          <Route path="category" element={<CreateCategory />} />

          {/* PRODUCT */}
          <Route path="products" element={<ProductList />} />
          <Route path="product" element={<CreateProduct />} />
          
          {/* CONSULTATION */}
          <Route path="consultations" element={<ConsultationList />} />

          {/* 🔥 REVIEW */}
          <Route path="reviews" element={<ReviewList />} />
          <Route path="review" element={<CreateReview />} />

           <Route path="showroom-video" element={<Showroom />} />
           <Route path="showroom-from" element={<ShowroomForm />} />
           {/* ShowroomForm */}

        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;