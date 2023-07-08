import "./App.scss";
import Authentication from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import { useMemo } from "react";
import useAuth from "./hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import bootstrap from "bootstrap";

const toastStyle = {
  style: {
    borderRadius: "10px",
    fontSize: "18px",
  },
  duration: 3000,
};

const openToast = (result) => {
  if (result.status === "success") {
    toast.success(result.message, toastStyle);
  } else if (result.status === "error") {
    toast.error(result.message, toastStyle);
  }
};

const App = () => {
  const { user } = useAuth();

  return useMemo(() => {
    return (
      <>
        {user ? (
          <Dashboard openToast={openToast} />
        ) : (
          <Authentication openToast={openToast} />
        )}
        <Toaster />
      </>
    );
  }, [user]);
};

export default App;
