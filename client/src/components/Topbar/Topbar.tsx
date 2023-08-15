import React from 'react';
import './style.scss';
import useGetAdmin from '../../setup/hooks/useGetAdmin';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logout } from '../../redux/Auth/authService';

const Topbar: React.FC = (): JSX.Element => {
	const admin = useGetAdmin();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>()

	return (
		<div className="topbar">
			<p>{`${admin.name} ${admin.surname}`}</p>
			<button
				className="topbar__btn"
				onClick={() => navigate('/admin/settings')}
			>
				<span className="material-symbols-outlined">settings</span>
			</button>
			<div className='topbar__logout'>
				<Button size='small' onClick={()=>{dispatch(logout());navigate('/')}}>Logout</Button>
			</div>
		</div>
	);
};

export default Topbar;
