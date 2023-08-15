import React from 'react';
import Input from '../../components/Input/Input';
import './style.scss';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { login } from '../../redux/Auth/authService';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate()

	const handleSubmit = (e:any) => {
		e.preventDefault();

		const formElement = e.target as HTMLFormElement;
		const isValid = formElement.checkValidity();
		const firstInvalidField = formElement.querySelector(
			':invalid'
		) as HTMLInputElement;
		firstInvalidField?.focus();
		if (isValid)
			dispatch(
				login({
					password: formElement.password.value,
					email: formElement.email.value,
				})
			).then((res: any) => {
				if (!res.error) navigate('/admin/dashboard');
			});
	};

	return (
		<div className="auth">
			<div className="auth__form-container">
				<div className="auth__form-contaner__title">
					<h1>Sign In</h1>
				</div>
				<form
					onSubmit={handleSubmit}
					noValidate
				>
					<Input
						name="email"
						placeholder="Email"
						size="small"
						// icon={<User />}
						required
					/>
					<Input
						type="password"
						name="password"
						placeholder="Password"
						size="small"
						// icon={<Lock />}
						required
					/>

					<Button size="small">Sign In</Button>
				</form>
			</div>
		</div>
	);
};

export default Auth;
