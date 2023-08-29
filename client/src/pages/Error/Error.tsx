import React from 'react';
import Button from '../../components/atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import Img from '../../assets/images/errorPage.png';
import './style.scss';

const Error: React.FC = (): JSX.Element => {
	const navigate = useNavigate();
	return (
		<div className="error-page">
			<div className="error-page_img">
				<img
					src={Img}
					alt=""
				/>
			</div>
			<div className="error-page_four">404</div>
			<div>Page not found</div>
			<div className="error-page_btn">
				<Button
					onClick={() => {
						navigate('/admin/dashboard');
					}}
					size={'small'}
				>
					Go Home
				</Button>
			</div>
		</div>
	);
};

export default Error;
