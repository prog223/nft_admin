import { useContext } from 'react';
import { ToastContext } from '../../components/atoms/Toast/ToastContext';


export const useToast = () => useContext(ToastContext);
