import { useState, useEffect } from "react";
import axios from "axios";

export const useCart = (user, isLoggedIn) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartItemCount = async () => {
      if (user && user.nameid && !isLoggedIn && !isNaN(user.nameid)) {
        axios
          .get(`https://localhost:7217/api/shoppingcart/${+user.nameid}`)
          .then((res) => {
            if (res.status === 404) {
              setCartItemCount(0);
            } else {
              setCartItemCount(res.data.$values.length);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };

    updateCartItemCount();
  }, [user, isLoggedIn]);

  return [cartItemCount, setCartItemCount];
};
