import About from "./Component/About";

import Home from "./Component/Home";
// import Navbar from "./Component/Navbar";
import Registre from "./Component/Accounts/Registre";
import Login from "./Component/Accounts/Login";
import PrivateRoutes from "./Component/auth/PrivateRoutes";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { createContext, useEffect, useState } from "react";

type AuthData = {
  password: string | null;
  email: string | null;
  id: string | null;
};

type AuthContextValue = {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
};
export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthData>({
    password: null,
    email: null,
    id: null,
  });
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("currentUser") || "{}");

    const id = data.id;
    const email = data.email;
    const password = data.password;

    if (data.email) {
      setAuth({
        password,
        email,
        id,
      });
    }
  }, []);
  console.log("auth", auth.id);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registre" element={<Registre />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/About" element={<About />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
