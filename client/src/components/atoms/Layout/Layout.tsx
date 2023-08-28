import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../../molecules/Topbar/Topbar';
import classNames from 'classnames';
import './style.scss';

const Layout: React.FC = (): JSX.Element => {
	const [toggle, setToggle] = useState<boolean>(true);

	return (
		<div style={{ display: 'flex', height: '100%' }}>
			<div
				className={classNames('sidebar-cont', {
					'sidebar-cont__close': !toggle,
				})}
			>
				<Sidebar
					setToggle={setToggle}
					toggle={toggle}
				/>
			</div>
			<div
				className={classNames('content-cont', {
					'content-cont__active': !toggle,
				})}
			>
				<Topbar />
				<div className='container-default'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
