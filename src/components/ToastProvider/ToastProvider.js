import React from "react";
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

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.code === "Escape") {
        setToasts([]);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  });

  return (
    <ToastContext.Provider value={{ toasts, dismissToast, addToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
