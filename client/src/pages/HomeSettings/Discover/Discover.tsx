import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Eye } from '../../../assets/images/Eye.svg';
import './style.scss';
import SelectNft from '../../../components/molecules/SelectNft/SelectNft';

const Discover: React.FC = (): JSX.Element => {
	return (
		<div className="discover container section">
			<div className="section-title">
				<h2>Discover More NFTs</h2>
				<p>Explore new trending NFTs</p>
			</div>

			<div className="discover__grid">
				<SelectNft size='sm'/>
				<SelectNft size='sm'/>
				<SelectNft size='sm'/>
			</div>
		</div>
	);
};

export default Discover;
