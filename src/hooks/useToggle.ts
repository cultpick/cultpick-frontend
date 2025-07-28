import { useCallback, useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [isOn, setIsOn] = useState(initialValue);

  const toggle = useCallback(() => {
    setIsOn((prev) => !prev);
  }, []);

  const setOn = useCallback(() => {
    setIsOn(true);
  }, []);

  const setOff = useCallback(() => {
    setIsOn(false);
  }, []);

  return {
    isOn,
    toggle,
    setOn,
    setOff,
  };
};
