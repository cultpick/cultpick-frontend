import { useCallback, useState, useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export const useToast = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("info");

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    setMessage(message);
    setType(type);
    setShow(true);
  }, []);

  return {
    show,
    message,
    type,
    showToast,
  };
};
