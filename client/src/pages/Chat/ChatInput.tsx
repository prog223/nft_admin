import Picker, { Emoji } from 'emoji-picker-react';
import React, { useState, ChangeEvent } from 'react';
import { useEnter } from '../../setup/hooks/useEnter';

interface ChatInputProps {
	handleSendMsg: Function;
	showEmojiPicker: boolean;
	setShowEmojiPicker: Function;
}

const ChatInput: React.FC<ChatInputProps> = ({
	handleSendMsg,
	showEmojiPicker,
	setShowEmojiPicker,
}) => {
	const [msg, setMsg] = useState<string>('');

	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setMsg(event.target.value);
	};

	const handleSendClick = () => {
		if (msg.length > 0) {
			handleSendMsg(msg);
			setMsg('');
			setShowEmojiPicker(false);
		}
	};

	useEnter(handleSendClick);

	return (
		<div className="chat-inp">
			<div className="chat-inp_cont">
				<textarea
					placeholder="Message here..."
					value={msg}
					onChange={handleInputChange}
				></textarea>
				<div className="button-container">
					<div className="emoji">
						<button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
							<Emoji unified="1f47b" />
						</button>
					</div>
					<button onClick={handleSendClick}>
						<span className="material-symbols-outlined">send</span>
					</button>
				</div>
			</div>
			{showEmojiPicker && (
				<div className="emoji_cont">
					<Picker
						height={250}
						width="100%"
						lazyLoadEmojis={true}
						searchDisabled={true}
						onEmojiClick={(emojiObject) =>
							setMsg((prevMsg) => prevMsg + emojiObject.emoji)
						}
					/>
				</div>
			)}
		</div>
	);
};

export default ChatInput;
