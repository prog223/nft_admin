import React from 'react';
import useGetAdmin from '../../setup/hooks/useGetAdmin';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { changePassword } from '../../redux/Auth/authService';

const Settings: React.FC = (): JSX.Element => {
	const admin = useGetAdmin();
  const dispatch = useDispatch<AppDispatch>()

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
		<div className="settings">
			{/* {admin.isSuper && (
				<div>
					<h2>Create New Admin</h2>
					<div className="settings__creaetAdmin">
              
          </div>
				</div>
			)} */}
			<h1>Settings</h1>
			<div>
				<div className="auth__form-container">
					<div className="auth__form-contaner__title">
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
							// icon={<User />}
							required
						/>
						<Input
							type="password"
							name="new_password"
							placeholder="New password"
							size="small"
							// icon={<User />}
							required
						/>
						<Input
							type="password"
							name="confirm_password"
							placeholder="Confirm password"
							size="small"
							// icon={<Lock />}
							required
						/>

						<Button size="small">Change</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Settings;
