import React, { useEffect, useRef, useState } from 'react';
import Chats from './Chats';
import useGetAdmin from '../../setup/hooks/useGetAdmin';
import { io, Socket } from 'socket.io-client';
import ChatContainer from './ChatContainer';
import './style.scss';

const host: any = process.env.REACT_APP_BASE_URL;
const Chat: React.FC = () => {
	const admin = useGetAdmin();
	const socket = useRef<Socket | null>(null);
	const [currentChat, setCurrentChat] = useState<{ _id: string } | null>(null);

	useEffect(() => {
		if (admin) {
			socket.current = io(host);
			socket.current.emit('add-user', admin._id);
		}
	}, [admin]);

	return (
		<div className="chat">
			<Chats
				onSelect={(_id: string) => setCurrentChat({ _id })}
				current={currentChat}
				socket={socket}
			/>
			{currentChat ? (
				<>
					<ChatContainer
						socket={socket}
						currentChat={currentChat}
					/>
				</>
			) : (
				<>
					<div className="chat_container">
						<div style={{ textAlign: 'center', marginTop: '40px' }}>
							Please select chat...
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Chat;
