import {BrowserRouter, Routes, Route} from "react-router-dom"
import { AuthProvider } from "./context/auth";
import MainNav from "./components/nav/MainNav";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivate from "./pages/auth/AccountActivate";
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
            </Routes>
        </AuthProvider>    
    </BrowserRouter>
  );
}

export default App;
