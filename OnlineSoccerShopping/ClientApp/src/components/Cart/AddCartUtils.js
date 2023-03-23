import axios from "axios";

export const AddCartUtils = async (addToCart) => {
  try {
    const res = await axios.post("https://localhost:7217/api/shoppingcart", {
      userId: addToCart[0],
      productId: addToCart[1],
      quantity: addToCart[2],
      size: addToCart[3],
    });

    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
