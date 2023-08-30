import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { MessageT } from '../type';

interface ChatContextType {
	socket: Socket;
	arrivalMessage: MessageT;
	sendMessage: (message: any) => void;
	notifications: any;
	currentChat: string;
	setCurrentChat: any;
	setNotifications: any;
}
const host: string | undefined = process.env.REACT_APP_BASE_URL;
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChat() {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error('useChat must be used within a ChatProvider');
	}
	return context;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
	const [socket] = useState(() => io(host || ''));
	const [arrivalMessage, setArrivalMessage] = useState<any>(null);
	const [notifications, setNotifications] = useState<any[]>([]);
	const [currentChat, setCurrentChat] = useState<string>('');

	const sendMessage = (message: any) => {
		socket.emit('send-msg', message);
	};

	useEffect(() => {
		socket.on('msg-recieve', (msg: any) => {
			setArrivalMessage({ fromSelf: false, message: msg });
		});
		socket.on('notification', (ntf: any) => {
			const isChatOpen = currentChat === ntf.sender;
			if (!isChatOpen) setNotifications((prev: any) => [ntf, ...prev]);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<ChatContext.Provider
			value={{
				socket,
				arrivalMessage,
				sendMessage,
				notifications,
				setNotifications,
				currentChat,
				setCurrentChat,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
}
