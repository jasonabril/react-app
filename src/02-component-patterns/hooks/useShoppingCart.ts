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
      const productInCart: ProductInCart = oldShopingCart[product.id] || {
        ...product,
        count: 0,
      };
      if (Math.max(productInCart.count + count, 0) > 0) {
        productInCart.count += count;
        return {
          ...oldShopingCart,
          [product.id]: productInCart,
        };
      }

      // Borrar el producto
      const { [product.id]: toDelete, ...rest } = oldShopingCart;

      return { ...rest };

      // if (count === 0) {
      //   const { [product.id]: toDelete, ...rest } = oldShopingCart;

      //   return { ...rest };
      // }
      // return {
      //   ...oldShopingCart,
      //   [product.id]: { ...product, count },
      // };
    });
  };
  return { shoppingCart, onProductCountchange };
};
