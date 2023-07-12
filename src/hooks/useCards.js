import React, { useEffect } from "react";
import { getCards } from "../services/Firebase";
import useAuth from "./useAuth";

export const useCards = () => {
  const { user } = useAuth();
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    const unsubscribe = getCards(user.uid || "Test", setCards);

    return () => {
      unsubscribe();
    };
  }, [user]);

  return cards;
};
