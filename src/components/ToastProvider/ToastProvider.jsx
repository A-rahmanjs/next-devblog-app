'use client'
import React from "react";
import useKeydown from "@/hooks/use-keydown";
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
  ]);

  React.useEffect(() => {
    let timeout;
    if (toasts.length >= 1) {
      timeout = setTimeout(() => {
        setToasts([])
      }, 3500)
    }
    return () => clearTimeout(timeout)
  }, [toasts])

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown("Escape", handleEscape);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }
const value= { toasts, createToast, dismissToast, setToasts }
  return (
    <ToastContext.Provider
      value={value}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
