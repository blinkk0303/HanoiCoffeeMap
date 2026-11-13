import { BrowserRouter, Route, Routes } from "react-router";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MapPage from "./pages/MapPage";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashBoardPage from "./pages/admin/DashboardPage";
import CafesPage from "./pages/admin/cafes/CafesPage";
import UsersPage from "./pages/admin/users/UsersPage";
import AdminSidebar from "./components/admin/AdminSidebar";
import ReviewsPage from "./pages/admin/ReviewsPage";
import TagsPage from "./pages/admin/TagsPage";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/" element={<MapPage />} />

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminSidebar/>}>
              <Route path="/dashboard" element={<DashBoardPage />} />
              <Route path="/cafes" element={<CafesPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/cafe_tags" element={<TagsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
