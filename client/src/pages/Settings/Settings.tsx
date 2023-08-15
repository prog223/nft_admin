import React from 'react';
import useGetAdmin from '../../setup/hooks/useGetAdmin';
import CreateAdminForm from './CreateAdminForm';
import ChangePasswordForm from './ChangePasswordForm';
import './style.scss'

const Settings: React.FC = (): JSX.Element => {
	const admin = useGetAdmin();
	return (
		<div className="settings">
			<h1>Settings</h1>
			<div className='settings_forms'>
				<ChangePasswordForm />
				{admin.isSuper && <CreateAdminForm />}
			</div>
		</div>
	);
};

export default Settings;
