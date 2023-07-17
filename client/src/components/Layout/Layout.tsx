import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import './style.scss';
import classNames from 'classnames';

const Layout: React.FC = (): JSX.Element => {
	const [toggle, setToggle] = useState<boolean>(true);

	return (
		<div style={{ display: 'flex', height: '100%'}}>
			<div className={classNames('sidebar-cont', {'sidebar-cont__close': !toggle})}>
				<Sidebar setToggle={setToggle} toggle={toggle}/>
			</div>
			<div className={classNames('content-cont', {'content-cont__active': !toggle})}>
				<Topbar />
				<div style={{ padding: '30px 30px 0 30px', width: '100%' }}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
