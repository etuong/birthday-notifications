import React, { useEffect } from "react";
import firebase from "../services/Firebase";

const AuthContext = React.createContext();

const AuthProvider = (children) => {
  const [user, setUser] = React.useState(firebase.auth());

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (_user) => {
        console.log(user);
        setUser(_user);
      },
      (_error) => console.log(_error)
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const value = { user };

  return <AuthContext.Provider value={value} {...children} />;
};

export { AuthContext, AuthProvider };
