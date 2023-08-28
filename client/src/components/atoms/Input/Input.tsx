import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import './style.scss';

interface Props {
	name?: string;
	value?: string;
	type?: string;
	size?: 'small' | 'large' | null;
	placeholder?: string;
	errorText?: string;
	icon?: React.ReactNode;
	className?: string;
	required?: boolean;
	pattern?: string;
	onChange?: any;
	onFocus?: any;
	onBlur?: any;
	min?: string;
	label?: string;
	ref?: any;
	defaultValue?: string;
}

const Input: React.FC<Props> = ({
	name,
	type,
	size,
	placeholder,
	errorText,
	icon,
	className,
	label,
	...rest
}: Props): JSX.Element => {
	const inpStyle = classNames('input-container', size ?? 'large');
	const [validationMessage, setValidationMessage] = useState<string>('');

	const onInvalid = (e: FormEvent) => {
		const target = e.target as HTMLInputElement;
		setValidationMessage(target.validationMessage);
	};

	const onBlur = (e: FormEvent) => {
		const target = e.target as HTMLInputElement;

		if (!!validationMessage) {
			setValidationMessage(target.validationMessage);
		}
	};

	return (
		<div className="inp">
			{label && <label htmlFor={name}>{label}</label>}
			<div className={inpStyle}>
				{icon}
				<input
					id={name}
					className="input"
					type={type}
					onInvalid={onInvalid}
					onBlur={onBlur}
					placeholder={placeholder}
					{...rest}
				/>
			</div>
		</div>
	);
};

export default Input;
