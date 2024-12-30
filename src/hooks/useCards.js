import { useCallback, useEffect, useState } from "react";
import { getCards } from "../services/Firebase";
import useAuth from "./useAuth";

const useCards = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);

  const fetchCards = useCallback(
    async (userId) => {
      const cards = await getCards(userId, setCards);
    },
    [setCards]
  );

  useEffect(() => {
    if (user) {
      fetchCards(user.uid);
    }
  }, [user, fetchCards]);

  return cards;
};


export default useCards;