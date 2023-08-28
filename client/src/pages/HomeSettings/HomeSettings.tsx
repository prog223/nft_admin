import React, { useEffect } from 'react';
import Greetings from './Greetings/Greetings';
import Trending from './Trending/Trending';
import Discover from './Discover/Discover';
import Nft from './Nft/Nft';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getContent } from '../../redux/Content/contentService';
import './style.scss';

const HomeSettings: React.FC = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getContent());
	}, []);
	
	return (
		<div className="home-settings">
			<h1>Home Settings</h1>
			<div className="home-settings_container">
				<Greetings />
				<Trending />
				<Discover />
				<Nft />
			</div>
		</div>
	);
};

export default HomeSettings;
