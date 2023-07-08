import "./App.scss";
import Authentication from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import { useMemo } from "react";
import useAuth from "./hooks/useAuth";

function App() {
  const { user } = useAuth();

  return useMemo(() => {
    console.log(user);
    return <>{user ? <Dashboard /> : <Authentication />}</>;
  }, [user]);
}

export default App;
