import React from "react";

function useEscapeKey(callback) {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.code === "Escape") {
        callback(e);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);
}

export default useEscapeKey;
