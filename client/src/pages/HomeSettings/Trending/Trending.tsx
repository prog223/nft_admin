import React, { useEffect } from 'react';
import './style.scss';
import SelectCollection from '../../../components/molecules/SelectCollection/SelectCollection';

const Trending: React.FC = (): JSX.Element => {

	return (
		<div className="trending container section">
			<div className="section-title">
				<h2>Trending Collection</h2>
				<p>Checkout Our Weekly Updated Trending Collection.</p>
			</div>
			<div className="trending__collections">
				<SelectCollection/>
				<SelectCollection/>
				<SelectCollection/>
			</div>
		</div>
	);
};

export default Trending;
