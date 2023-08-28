import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import classNames from 'classnames';
import { Socket } from 'socket.io-client';

interface Props {
	onSelect: (_id: string) => void;
	current: { _id: string } | null;
	socket: React.MutableRefObject<Socket | null>;
}

const Chats: React.FC<Props> = ({ onSelect, current, socket }) => {
	const [contacts, setContacts] = useState<any[]>([]);
	const [notifications, setNotifications] = useState<any[]>([]);

	const fetchContacts = async () => {
		try {
			const response = await axios.get(`admin/contacts`);
			setContacts(response.data);
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	useEffect(() => {
		fetchContacts();
	}, []);

	useEffect(() => {
		if (socket.current) {
			socket.current.on('notification', (ntf: any) => {
				const isChatOpen = current?._id === ntf.sender;
				if (!isChatOpen) setNotifications((prev: any) => [ntf, ...prev]);
			});
		}
	}, [socket.current]);

	const notificationCount = (id: string) => {
		const array = notifications.filter((ntf) => ntf.sender === id && id !== current?._id);
		if (array) return array.length;
	};

	return (
		<div className="chats">
			{contacts.length ? (
				<>
					{contacts.map((e: any) => {
						return (
							<div
								className={classNames('chats_item', {
									chats_item_current: e._id === current?._id,
								})}
								onClick={() => {
									onSelect(e._id);
									setNotifications([
										...notifications.filter(
											(e) => e.sender === e._id
										),
									]);
								}}
								key={e._id}
							>
								<div className="chats_item_letter">
									{e.name.slice(0, 1).toUpperCase()}
								</div>
								<p>
									{e.name} {e.surname}
								</p>
								{notificationCount(e._id) ? (
									<div className="notification">
										{notificationCount(e._id)}
									</div>
								) : (
									<></>
								)}
							</div>
						);
					})}
				</>
			) : (
				<>You have no chats...</>
			)}
		</div>
	);
};

export default Chats;
