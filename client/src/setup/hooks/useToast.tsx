import { useContext } from 'react';
import { ToastContext } from '../../components/Toast/ToastContext';


export const useToast = () => useContext(ToastContext);
