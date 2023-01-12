import { createContext, CSSProperties, ReactElement } from "react";
import { useProduct } from "../hooks/useProduct";
import styles from "../styles/styles.module.css";
import { ProductCartHandlers } from "../interfaces/interfaces";

import {
  Product,
  ProductContextProps,
  OnChangeArgs,
  InitialValues,
} from "../interfaces/interfaces";

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export interface Props {
  // children?: ReactElement | ReactElement[];
  children: (args: ProductCartHandlers) => JSX.Element;
  product: Product;
  className?: string;
  style?: CSSProperties;
  onChange?: (args: OnChangeArgs) => void;
  value?: number;
  initialValues?: InitialValues;
}

export const ProductCard = ({
  children,
  product,
  className,
  style,
  onChange,
  value,
  initialValues,
}: Props) => {
  const { counter, increaseBy, maxCount, isMaxCountReached, reset } =
    useProduct({
      onChange,
      product,
      value,
      initialValues,
    });

  return (
    <Provider value={{ counter, increaseBy, product, maxCount }}>
      <div className={`${styles.productCard} ${className}`} style={style}>
        {children({
          count: counter,
          product,
          increaseBy,
          isMaxCountReached,
          maxCount: initialValues?.maxCount,
          reset,
        })}
      </div>
    </Provider>
  );
};
