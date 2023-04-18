import { createContext, useState, useEffect, useContext } from "react";
import { log, success, error } from "../utils/logs";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({});
  
  useEffect(() => {
    log(`fetching user...`);
    axios
      .get("/api/users/me")
      .then((res) => res.data)
      .then((user) => {
        success(`found user ${user.mail}`);
        setUser(user);
      })
      .catch(({ res }) => {
        error(res.status, res.statusText);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
