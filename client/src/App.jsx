import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/privateRoute";

import AdminDashboard from "./pages/AdminDashboard";
import EditUser from "./pages/EditUser";
import AddUser from "./pages/AddUser";
import ProtectedRoute from "./components/protectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
         {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoute/>}>
        <Route path="/sign-in" element={<SignIn userType="user" />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute userType="user" />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/sign-in" element={<SignIn userType="admin" />} />
        <Route element={<PrivateRoute userType="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
    <Route path="/admin/edit-user/:userId" element={<EditUser />} />
    <Route path="/admin/add-user" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
