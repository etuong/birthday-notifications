import React, { useState, useEffect, memo } from "react";
import useAuth from "./hooks/useAuth";
import Dashboard from "./components/Dashboard";
import Authentication from "./components/Authentication";
import { Toaster } from "react-hot-toast";
import "./App.scss";

const App = memo(() => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const openToast = (status, message, toastStyle) => {
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