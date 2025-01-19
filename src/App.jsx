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
  duration: 3000,
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
      {user ? <Dashboard openToast={openToast} /> :
        <>
          <div className="text-white bg-gradient bg-danger p-3 text-center">
            <h1 className="fw-bold display-6 m-0">Birthday Notifications 🎉!</h1>
          </div>
          <ol className="instructions my-4">
            <li>Create an account</li>
            <li>Create birthday cards</li>
            <li>On the day of the birthday, a reminder email notification will be sent to you</li>
          </ol>
          <Authentication openToast={openToast} />
        </>
      }
      <Toaster />
    </>
  );
});

export default App;