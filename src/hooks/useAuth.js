import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("AuthContext's value is undefined.");
  }

  return value;
};

export default useAuth;
