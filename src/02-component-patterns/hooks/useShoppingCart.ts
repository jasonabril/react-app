import { useState } from "react";
import { Product, ProductInCart } from "../interfaces/interfaces";

export const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState<{
    [key: string]: ProductInCart;
  }>({});

  const onProductCountchange = ({
    count,
    product,
  }: {
    count: number;
    product: Product;
  }) => {
    setShoppingCart((oldShopingCart) => {
      console.log({ count });

      if (count === 0) {
        const { [product.id]: toDelete, ...rest } = oldShopingCart;

        return { ...rest };
      }
      return {
        ...oldShopingCart,
        [product.id]: { ...product, count },
      };
    });
  };
  return { shoppingCart, onProductCountchange };
};
