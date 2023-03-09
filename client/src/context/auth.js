import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API } from "../config";


const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
        refreshToken: "",
    });

    useEffect (() => {
        let localStorageData = localStorage.getItem("auth")
        if(localStorageData) setAuth(JSON.parse(localStorageData));
    }, [])

//configure axios, sets axios default to API of server
axios.defaults.baseURL = API;

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };