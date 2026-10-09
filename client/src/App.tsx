import {BrowserRouter, Route, Routes} from "react-router"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import AdminDashBoard from "./pages/AdminDashBoard"
import MapPage from "./pages/MapPage"
import {Toaster} from "sonner"
import ProtectedRoute from "./components/auth/ProtectedRoute"


function App() {

  return (
    <>
    <Toaster richColors/>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
            <Route path="/signin" element={<SignInPage/>}></Route>
            <Route path="/signup" element={<SignUpPage/>}></Route>

          {/* protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MapPage/>} />
              <Route path="/dashboard" element={<AdminDashBoard/>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
