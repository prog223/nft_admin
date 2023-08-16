import { createContext } from 'react';

interface ToastContextValue {
  open: (content: React.ReactNode) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);
