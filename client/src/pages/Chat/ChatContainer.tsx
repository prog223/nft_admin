import React, { useEffect, useState, useRef } from 'react';
import useGetAdmin from '../../setup/hooks/useGetAdmin';
import { Socket } from 'socket.io-client';
import ChatInput from './ChatInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addMessages, getMessages } from '../../redux/Message/messageService';
import {
	selectMessages,
	updateMessages,
} from '../../redux/Message/messageSlice';
import classNames from 'classnames';

interface Props {
	currentChat: { _id: string } | null;
	socket: React.MutableRefObject<Socket | null>;
}

const ChatContainer: React.FC<Props> = ({ currentChat, socket }: Props) => {
	const admin = useGetAdmin();
	const [arrivalMessage, setArrivalMessage] = useState<any>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch<AppDispatch>();
	const { data } = useSelector(selectMessages);
	const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

	const receiveMessage = async (page: number) => {
		if (admin._id && currentChat) {
			dispatch(
				getMessages({
					from: admin._id,
					to: currentChat._id,
					page,
				})
			);
		}
	};

	useEffect(() => {
		receiveMessage(1);
	}, [admin, currentChat]);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop =
				containerRef.current.scrollHeight / data?.currentPage;
		}
	}, [data?.messages]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [data?.messages]);

	const handleSendMsg = async (msg: string) => {
		if (currentChat && socket.current) {
			socket.current.emit('send-msg', {
				to: currentChat._id,
				from: admin?._id,
				msg,
			});
			dispatch(
				addMessages({
					from: admin?._id,
					to: currentChat._id,
					message: msg,
				})
			);
			dispatch(updateMessages({ fromSelf: true, message: msg }));
		}
	};

	const handleScroll = () => {
		if (containerRef.current && data?.currentPage && data?.currentPage) {
			const scrollPosition = containerRef.current.scrollTop;
			if (scrollPosition === 0 && data.currentPage < data.totalPages) {
				receiveMessage(data?.currentPage + 1);
			}
		}
	};

	useEffect(() => {
		if (socket.current) {
			socket.current.on('msg-recieve', (msg: any) => {
				try {
					if (msg.from == currentChat?._id) {
						setArrivalMessage({ fromSelf: false, message: msg });
					}
				} catch (error) {
					console.error('Error setting arrival message:', error);
				}
			});
		}
	}, []);

	useEffect(() => {
		if (arrivalMessage && arrivalMessage.message.from == currentChat?._id) {
			dispatch(
				updateMessages({
					...arrivalMessage,
					message: arrivalMessage.message.msg,
				})
			);
		}
	}, [arrivalMessage]);

	return (
		<div className="chat_container">
			<div
				className={classNames('chat_messages', {
					'emoji-mobile': showEmojiPicker,
				})}
				ref={containerRef}
				onScroll={handleScroll}
			>
				{data?.messages.map((message: any, i: number) => {
					return (
						<div
							className="message-cont"
							ref={scrollRef}
							key={i}
						>
							<div
								className={`message ${
									message.fromSelf ? 'sended' : 'recieved'
								}`}
							>
								<div className="content">
									<p>{message.message}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<ChatInput
				handleSendMsg={handleSendMsg}
				setShowEmojiPicker={setShowEmojiPicker}
				showEmojiPicker={showEmojiPicker}
			/>
		</div>
	);
};

export default ChatContainer;
