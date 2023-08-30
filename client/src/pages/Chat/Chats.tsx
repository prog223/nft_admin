import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import classNames from 'classnames';
import { useChat } from '../../setup/contexts/socketContext';
interface Props {
	onSelect: (_id: string) => void;
	current: { _id: string } | null;
}

const Chats: React.FC<Props> = ({ onSelect, current }) => {
	const [contacts, setContacts] = useState<any[]>([]);
	const { notifications, setNotifications } = useChat();
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

	const notificationCount = (id: string) => {
		const array = notifications.filter(
			(ntf: any) => ntf.sender === id && id !== current?._id
		);
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
											(e: any) => e.sender === e._id
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
