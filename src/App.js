import "./App.scss";
import Authentication from "./components/Authentication";
import Dashboard from "./components/Authentication";
import { useMemo } from "react";
import useAuth from "./hooks/useAuth";

function App() {
  const { user } = useAuth();

  return useMemo(() => {
    return <>{user ? <Dashboard /> : <Authentication />}</>;
  }, [user]);
}

export default App;
