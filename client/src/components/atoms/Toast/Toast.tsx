import React, { ReactNode } from 'react';
import { useTimeout } from '../../../setup/hooks/useTimeout';

interface Props {
	close: () => void;
	children: ReactNode;
}

export const Toast: React.FC<Props> = (props: Props): JSX.Element => {
	useTimeout(props.close, 5000);
	
	return (
		<div className="toast">
			<div className="toast__text">{props.children}</div>
			<div>
				<button
					onClick={props.close}
					className="toast__close-btn"
				>
					x
				</button>
			</div>
		</div>
	);
};
