//@ts-nocheck
import { useEffect, useRef, useState } from "react";

export default function useSearchInputState(searchHandler) {
  // to prevent calling the handler on component mount
  const didMountRef = useRef(false);

  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    let delayDebounceFn;

    if (didMountRef.current) {
      delayDebounceFn = setTimeout(searchHandler, 600);
    } else {
      didMountRef.current = true;
    }

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return [searchValue, setSearchValue];
}
