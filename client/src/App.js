import {BrowserRouter, Routes, Route} from "react-router-dom"
import { AuthProvider } from "./context/auth";
import MainNav from "./components/nav/MainNav";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
    <MainNav />
    <Toaster />
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </AuthProvider>    
    </BrowserRouter>
  );
}

export default App;
