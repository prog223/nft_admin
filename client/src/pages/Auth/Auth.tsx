import React, { useEffect } from 'react';
import Input from '../../components/atoms/Input/Input';
import './style.scss';
import Button from '../../components/atoms/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { login } from '../../redux/Auth/authService';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../redux/Auth/authSlice';
import Loading from '../../components/atoms/Loading/Loading';
import { useToast } from '../../setup/hooks/useToast';

const Auth: React.FC = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { isLoading, error } = useSelector(selectAuth);
	const toast = useToast();

	const handleSubmit = (e: any) => {
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

	useEffect(() => {
		if (error?.data) toast?.open(error?.data);	
	}, [error]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
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
			)}
		</>
	);
};

export default Auth;
