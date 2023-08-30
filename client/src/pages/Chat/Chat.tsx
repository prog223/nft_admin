import React, { useEffect, useState } from 'react';
import Chats from './Chats';
import useGetAdmin from '../../setup/hooks/useGetAdmin';
import ChatContainer from './ChatContainer';
import './style.scss';
import { useChat } from '../../setup/contexts/socketContext';

const Chat: React.FC = () => {
	const admin = useGetAdmin();
	const {socket} = useChat()	
	const [currentChat, setCurrentChat] = useState<{ _id: string } | null>(null);

	useEffect(() => {
		if (admin) {
			socket.emit('add-user', admin._id);
		}
	}, [admin]);

	return (
		<div className="chat">
			<Chats
				onSelect={(_id: string) => setCurrentChat({ _id })}
				current={currentChat}
			/>
			{currentChat ? (
				<>
					<ChatContainer
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
