import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import Loading from '../../components/atoms/Loading/Loading';
import { createAdmin } from '../../redux/Auth/authService';
import { selectAuth } from '../../redux/Auth/authSlice';

const CreateAdminForm: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { data, isLoading, error } = useSelector(selectAuth);
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
				createAdmin({
					name: formElement.username.value,
					surname: formElement.surname.value,
					email: formElement.email.value,
					password: formElement.password.value,
					isSuper: false
				})
			).then((res: any) => {
				if (!res.error) navigate('/admin/dashboard');
			});
	};
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="settings_forms_form">
					<div className="settings_forms_form__title">
						<h2>Create New Admin</h2>
					</div>
					<form
						onSubmit={handleSubmit}
						noValidate
					>
						<Input
							name="username"
							placeholder="Name"
							size="small"
							required
						/>
						<Input
							name="surname"
							placeholder="Surname"
							size="small"
							required
						/>
						<Input
							name="email"
							placeholder="Email"
							size="small"
							required
						/>
						<Input
							type="password"
							name="password"
							placeholder="Password"
							size="small"
							required
						/>
						<Button size="small">Create</Button>
					</form>
				</div>
			)}
		</>
	);
};

export default CreateAdminForm;
