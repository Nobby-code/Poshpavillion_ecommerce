import { createContext, useContext, useState } from 'react';

const ToastContext = createContext(); // ✅ This must be defined once

export const useToast = () => useContext(ToastContext); // ✅ This will only work if provider is active

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showToast = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div className="toast show align-items-center text-white bg-success border-0">
            <div className="d-flex">
              <div className="toast-body">{message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setMessage(null)}
              ></button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;