import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { changePassword } from '../../redux/Auth/authService';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import authSlice, { selectAuth } from '../../redux/Auth/authSlice';
import Loading from '../../components/atoms/Loading/Loading';

const ChangePasswordForm: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, isLoading, error } = useSelector(selectAuth);
	const navigate = useNavigate();
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
				changePassword({
					current_password: formElement.current_password.value,
					new_password: formElement.new_password.value,
					confirm_password: formElement.confirm_password.value,
				})
			).then((res: any) => {
				// if (!res.error) navigate('/dashboard');
			});
	};	
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="settings_forms_form">
					<div className="settings_forms_form__title">
						<h2>Change password</h2>
					</div>
					<form
						onSubmit={handleSubmit}
						noValidate
					>
						<Input
							type="password"
							name="current_password"
							placeholder="Current password"
							size="small"
							required
						/>
						<Input
							type="password"
							name="new_password"
							placeholder="New password"
							size="small"
							required
						/>
						<Input
							type="password"
							name="confirm_password"
							placeholder="Confirm password"
							size="small"
							required
						/>

						<Button size="small">Change</Button>
					</form>
				</div>
			)}
		</>
	);
};

export default ChangePasswordForm;
