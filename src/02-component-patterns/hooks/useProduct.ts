import { useEffect, useRef, useState } from "react";
import { OnChangeArgs, Product } from "../interfaces/interfaces";

interface UseProductArgs {
  product: Product;
  onChange?: (args: OnChangeArgs) => void;
  value?: number;
}

export const useProduct = ({
  onChange,
  product,
  value = 0,
}: UseProductArgs) => {
  const [counter, setCounter] = useState(value);
  const isControlled = useRef(!!onChange);

  useEffect(() => {
    setCounter(value);
  }, [value]);

  const increaseBy = (value: number) => {
    // console.log("isControlled", isControlled.current);

    if (isControlled.current) {
      return onChange!({ count: value, product });
    }

    const newValue = Math.max(counter + value, 0);

    setCounter((prev) => Math.max(prev + value, 0));

    onChange && onChange({ count: newValue, product });
  };

  return { counter, increaseBy };
};
