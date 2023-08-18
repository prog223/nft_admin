import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { ToastContext } from './ToastContext';
import './style.scss'

interface IToast {
	id: string;
	content: React.ReactNode;
}

interface ToastProviderProps {
	children: React.ReactNode;
}

function generateUEID() {
	let first: number | string = (Math.random() * 46656) | 0;
	let second: number | string = (Math.random() * 46656) | 0;
	first = ('000' + first.toString(36)).slice(-3);
	second = ('000' + second.toString(36)).slice(-3);

	return first + second;
}

export const ToastProvider: React.FC<ToastProviderProps> = (props) => {
	const [toasts, setToasts] = useState<IToast[]>([]);

	const open = (content: React.ReactNode) =>
		setToasts((currentToasts) => [
			...currentToasts,
			{ id: generateUEID(), content },
		]);

	const close = (id: string) =>
		setToasts((currentToasts) =>
			currentToasts.filter((toast) => toast.id !== id)
		);

	const contextValue = useMemo(() => ({ open }), []);

	return (
		<ToastContext.Provider value={contextValue}>
			{props.children}
			{createPortal(
				<div className="toasts-wrapper">
					{toasts.map((toast) => (
						<Toast
							key={toast.id}
							close={() => close(toast.id)}
						>
							{toast.content}
						</Toast>
					))}
				</div>,
				document.body
			)}
		</ToastContext.Provider>
	);
};
