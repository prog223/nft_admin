import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './style.scss';

interface Props{
	variant?: 'main' | 'white' | 'second';
	size?: 'large' | 'small' | null;
	children: ReactNode;
	onClick?: any;
	type?: 'button' | 'submit' | 'reset' | undefined;
	disabled?: boolean;
};

const Button: React.FC<Props> = (props: Props): JSX.Element => {
	const buttonStyle = classNames(
		'button',
		props.variant ?? 'main',
		props.size ?? 'large'
	);
	return (
		<button
			type={props.type}
			className={buttonStyle}
			{...props}
		>
			{props.children}
		</button>
	);
};

export default Button;
