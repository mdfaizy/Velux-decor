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
import Overview from "./components/screens/dashboard/Overview ";
import ProductDetails from "./screens/ProductDetails";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { RoomInspiration } from "./screens/AiAgentMobile/RoomInspiration";
import { Categories } from "./screens/AiAgentMobile/Categories";
import EnquiryTable from "./screens/AiAgentMobile/EnquiryTable";
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
    <Route
  path="/categories"
  element={
    <Categories/>
  }
/>
    <Route path="/featured-products" element={<FeaturedProducts />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path='/services-s' element={<Services/>}/>
    <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route
      path="/login"
      element={
        <OpenRoute>
          <Login />
        </OpenRoute>
      }
    />
    <Route path='/contact' element={<Contact/>}/>
<Route path="/showroom-video" element={<Showroom />} />
{/* <Route path="/room-inspiration" element={<RoomInspiration/>}/> */}
<Route
  path="/room-inspiration"
  element={
    <RoomInspiration
      roomRef={() => {}}
      roomInView={true}
      scrollTo={() => {}}
      setBookingOpen={() => {}}
    />
  }
/>
  </Route>

        {/* Dashboard */}
        <Route path="/:role" element={<PrivateRoute>
      <Dashboard />
    </PrivateRoute>}>

          {/* DEFAULT */}
          <Route index element={<Navigate to="overview" />} />
           <Route path="overview" element={<Overview />} />
          {/* USERS */}
          <Route path="signup" element={<Signup />} />
          <Route path="users" element={<UserListPage />} />
<Route path="enquiry" element={<EnquiryTable />} />
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