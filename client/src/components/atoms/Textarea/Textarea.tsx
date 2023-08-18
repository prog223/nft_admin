import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import './style.scss';

interface Props {
	name?: string;
	value?: string;
	size?: 'small' | 'large' | null;
	placeholder?: string;
	errorText?: string;
	icon?: React.ReactNode;
	className?: string;
	required?: boolean;
	pattern?: string;
	onChange?: any;
}

const Textarea: React.FC<Props> = ({
	name,
	size,
	placeholder,
	errorText,
	icon,
	className,
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
			<div className={inpStyle}>
				{icon}
				<textarea
					id={name}
					className="input textarea"
					onInvalid={onInvalid}
					onBlur={onBlur}
					placeholder={placeholder}
					{...rest}
				/>
			</div>
			{!!validationMessage && <div className="inp_error">{errorText}</div>}
		</div>
	);
};

export default Textarea;