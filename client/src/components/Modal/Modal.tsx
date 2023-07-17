import React from 'react';
import './style.scss';
import Button from '../Button/Button';

interface Props {
	isOpen: boolean;
	setIsOpen: Function;
	title?: string;
	children: React.ReactNode;
	buttons: Array<{
		button: string;
		action: Function;
		variant?: 'main' | 'white' | 'second' | undefined;
	}>;
}

const Modal: React.FC<Props> = ({
	setIsOpen,
	children,
	title,
	isOpen,
	buttons,
}: Props): JSX.Element => {
	return (
		<>
			{isOpen ? (
				<>
					<div
						className="modal-darkBG"
						onClick={() => setIsOpen()}
					/>
					<div className="modal centered">
						<div className="modal__header">
							<h5 className="modal__header__heading">{title}</h5>
						</div>
						<button
							className="modal__closeBtn"
							onClick={() => setIsOpen()}
						>
							&times;
						</button>
						<div className="modal__content">{children}</div>
						<div className="modal__buttons">
							{buttons.map((e, i) => (
								<Button
									size="small"
									onClick={() => e.action()}
									variant={e.variant}
									key={i}
								>
									{e.button}
								</Button>
							))}
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default Modal;
