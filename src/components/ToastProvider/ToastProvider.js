import React from "react";
import useEscapeKey from "../../hooks/useEscapeKey/useEscapeKey";
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const dismissToast = (id) => {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  };

  const addToast = (message, variantType) => {
    const nextToasts = [
      ...toasts,
      { id: crypto.randomUUID(), variantType, message },
    ];
    setToasts(nextToasts);
  };

  useEscapeKey(() => {
    setToasts([]);
  });
  
  return (
    <ToastContext.Provider value={{ toasts, dismissToast, addToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
