import { useEffect, useRef, useState } from "react";
import { OnChangeArgs, Product, InitialValues } from "../interfaces/interfaces";

interface UseProductArgs {
  product: Product;
  onChange?: (args: OnChangeArgs) => void;
  value?: number;
  initialValues?: InitialValues;
  maxCount?: () => number | undefined;
}

export const useProduct = ({
  onChange,
  product,
  value = 0,
  initialValues,
}: UseProductArgs) => {
  const [counter, setCounter] = useState<number>(initialValues?.count || value);

  const isMounted = useRef(false);

  const increaseBy = (value: number) => {
    let newValue = Math.max(counter + value, 0);
    if (initialValues?.maxCount) {
      newValue = Math.min(newValue, initialValues.maxCount);
    }
    setCounter(newValue);

    onChange && onChange({ count: newValue, product });
  };

  // useEffect(() => {
  //   isMounted.current = true;
  // }, []);

  useEffect(() => {
    if (!isMounted.current) return;
    setCounter(value);
  }, [value]);

  const reset = () => {
    setCounter(initialValues?.count || value);
  };

  return {
    counter,
    increaseBy,
    isMaxCountReached:
      !!initialValues?.count && initialValues.maxCount === counter,
    maxCount: initialValues?.maxCount,
    reset,
  };
};
