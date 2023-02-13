import { useEffect, useState } from "react";

export const useDebounce = (searchValue, ms = 500) => {
  const [debounceValue, setDebounceValue] = useState(searchValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(searchValue);
    }, ms);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [ms, searchValue]);

  return debounceValue;
};
