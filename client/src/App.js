import {BrowserRouter, Routes, Route} from "react-router-dom"
import { AuthProvider } from "./context/auth";
import MainNav from "./components/nav/MainNav";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AccessAccount from "./pages/auth/AccessAccount";
import Dashboard from "./pages/user/Dashboard";
import CreateAd from "./pages/user/Ad/CreateAd";
import PrivateRoute from "./components/routes/PrivateRoute";
import HouseForSale from "./pages/user/Ad/HouseForSale";
import HouseForRent from "./pages/user/Ad/HouseForRent";
import LandForSale from "./pages/user/Ad/LandForSale";
import LandForRent from "./pages/user/Ad/LandForRent";

function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
            <MainNav />
            <Toaster />
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/activate-account/:token" element={<AccountActivate />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/access-account/:token" element={<AccessAccount />} />
                <Route path="/auth/access-account/:token" element={<AccessAccount />} />

                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="ad/create" element={<CreateAd />} />
                    <Route path="ad/create/sell/House" element={<HouseForSale />} />
                    <Route path="ad/create/rent/House" element={<HouseForRent />} />
                    <Route path="ad/create/sell/Land" element={<LandForSale />} />
                    <Route path="ad/create/rent/Land" element={<LandForRent />} />
                </Route>

            </Routes>
        </AuthProvider>    
    </BrowserRouter>
  );
}

export default App;
