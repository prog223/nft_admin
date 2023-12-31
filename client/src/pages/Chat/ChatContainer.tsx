import React, { useEffect, useState, useRef } from 'react';
import useGetAdmin from '../../setup/hooks/useGetAdmin';
import ChatInput from './ChatInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addMessages, getMessages } from '../../redux/Message/messageService';
import {
	selectMessages,
	updateMessages,
} from '../../redux/Message/messageSlice';
import classNames from 'classnames';
import { useChat } from '../../setup/contexts/socketContext';

interface Props {
	currentChat: { _id: string } | null;
}

const ChatContainer: React.FC<Props> = ({ currentChat }: Props) => {
	const admin = useGetAdmin();
	const scrollRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch<AppDispatch>();
	const { data } = useSelector(selectMessages);
	const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
	const [trigger, setTrigger] = useState<boolean>(false);
	const { socket, sendMessage, arrivalMessage } = useChat();

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
		scrollRef.current?.scrollIntoView();
	}, [trigger]);

	const handleSendMsg = async (msg: string) => {
		if (currentChat && socket) {
			sendMessage({
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
			setTrigger(!trigger);
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
