
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Public Pages
import { AiAgentMobile } from "./screens/AiAgentMobile";
import PublicLayout from "./screens/layouts/PublicLayout";
import { FeaturedProducts } from "./screens/AiAgentMobile/FeaturedProducts";
import Services from "./screens/AiAgentMobile/Services";
import { Contact } from "./screens/AiAgentMobile/Contact";
import { Showroom } from "./screens/AiAgentMobile/Showroom";
import { ShowroomForm } from "./screens/AiAgentMobile/ShowroomForm";
import { RoomInspiration } from "./screens/AiAgentMobile/RoomInspiration";
import { Categories } from "./screens/AiAgentMobile/Categories";

// Auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Products
import ProductDetails from "./screens/ProductDetails";
import SubCategoryListPage from "./pages/subcategory/SubCategoryListPage";

// Dashboard
import Dashboard from "./components/screens/dashboard/Dashboard";
import Overview from "./components/screens/dashboard/Overview";
import UserListPage from "./pages/auth/UserListPage";
import CategoryList from "./pages/category/CategoryList";
import CreateCategory from "./pages/category/CreateCategory";
import ProductList from "./pages/products/ProductList";
import CreateProduct from "./pages/products/CreateProduct";
import ConsultationList from "./pages/consultation/ConsultationList";
import SubCategoryList from "./pages/subcategory/SubCategoryList";
import CreateSubCategory from "./pages/subcategory/CreateSubCategory";
import ReviewList from "./pages/review/ReviewList";
import CreateReview from "./pages/review/CreateReview";
import EnquiryTable from "./screens/AiAgentMobile/EnquiryTable";

// Profile
import UserProfile from "./pages/UserProfile";

// Guards
import PrivateRoute from "./pages/auth/PrivateRoute";
import OpenRoute from "./pages/auth/OpenRoute";
import ContactList from "./screens/AiAgentMobile/ContactList";
  

// const HomeRedirect = () => {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");

//   if (token && user) {
//     const userData = JSON.parse(user);

//     if (
//       userData.role === "admin" ||
//       userData.role === "designer"
//     ) {
//       return <Navigate to="/dashboard/overview" replace />;
//     }

//     return <Navigate to="/profile" replace />;
//   }

//   return <AiAgentMobile />;
// };
function App() {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route element={<PublicLayout />}>

          <Route path="/" element={<AiAgentMobile />} />
          {/* <Route path="/" element={<HomeRedirect />} />  */}

          <Route path="/categories" element={<Categories />} />
          <Route path="/featured-products" element={<FeaturedProducts />} />

          {/* 🔥 PRODUCT ROUTES */}
          <Route path="/products/:categorySlug/:subCategorySlug/:productSlug" element={<ProductDetails />} />
          <Route path="/products/:categorySlug/:subCategorySlug" element={<FeaturedProducts />} />
          <Route path="/product/:categorySlug/:productSlug" element={<ProductDetails />} />
          <Route path="/products/:categorySlug" element={<FeaturedProducts />} />

          <Route path="/subcategory/:categorySlug" element={<SubCategoryListPage />} />

          <Route path="/services-s" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/showroom-video" element={<Showroom />} />
          <Route path="/room-inspiration" element={<RoomInspiration />} />

          {/* 🔥 AUTH */}
          <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
          <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Route>

        {/* ================= USER ================= */}
        {/* <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        /> */}

<Route
  path="/profile"
  element={
    <PrivateRoute>
      <PublicLayout />
    </PrivateRoute>
  }
>
  <Route index element={<UserProfile />} />
</Route>
        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="overview" />} />

          <Route path="overview" element={<Overview />} />

          {/* USERS */}
          <Route path="signup" element={<Signup />} />
          <Route path="users" element={<PrivateRoute><UserListPage /> </PrivateRoute>} />
          <Route path="enquiry" element={<EnquiryTable />} />

          {/* CATEGORY */}
          <Route path="categories" element={<CategoryList />} />
          <Route path="category" element={<CreateCategory />} />

          {/* PRODUCT */}
          <Route path="products" element={<ProductList />} />
          <Route path="product" element={<CreateProduct />} />

          {/* CONSULTATION */}
          <Route path="consultations" element={<ConsultationList />} />

          {/* SUBCATEGORY */}
          <Route path="subcategories" element={<SubCategoryList />} />
          <Route path="subcategory" element={<CreateSubCategory />} />

          {/* REVIEW */}
          <Route path="reviews" element={<ReviewList />} />
          <Route path="review" element={<CreateReview />} />

          {/* SHOWROOM */}
          <Route path="showroom-video" element={<Showroom />} />
          <Route path="showroom-form" element={<ShowroomForm />} />
          <Route path="contact-list" element={<ContactList />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;