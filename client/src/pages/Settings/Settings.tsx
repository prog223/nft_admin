import React, { useState } from 'react';
import useGetAdmin from '../../setup/hooks/useGetAdmin';
import CreateAdminForm from './CreateAdminForm';
import ChangePasswordForm from './ChangePasswordForm';
import './style.scss';
import Tabs from '../../components/Tabs/Tabs';

const Settings: React.FC = (): JSX.Element => {
	const admin = useGetAdmin();
	const [active, setActive] = useState<number>(0);
	const tabs = [
		{
			id: 0,
			title: 'Change password',
			component: <ChangePasswordForm />,
		},
		{
			id: 1,
			title: 'Create admin',
			component: <CreateAdminForm />,
		},
	];

	const handleClick = (id: number) => {
		setActive(id);
	};

	return (
		<div className="settings">
			<h1>Settings</h1>
			<div className="settings_forms">
				{admin.isSuper ? (
					<div className='settings_tabs'>
						<Tabs
							selectedId={active}
							tabs={tabs}
							handleClick={handleClick}
						/>
						{tabs[active].component}
					</div>
				) : (
					<>	
						<ChangePasswordForm />
					</>
				)}
			</div>
		</div>
	);
};

export default Settings;
