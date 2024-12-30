import React, { memo, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "./services/Firebase";
import "./App.scss";
import Authentication from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import useAuth from "./hooks/useAuth";

const toastStyle = {
  style: {
    borderRadius: "10px",
    fontSize: "18px",
  },
  duration: 4000,
};

const App = memo(() => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openToast = ({ status, message }) => {
    toast[status](message, toastStyle);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user ? <Dashboard openToast={openToast} /> : <Authentication openToast={openToast} />}
      <Toaster />
    </>
  );
});

export default App;