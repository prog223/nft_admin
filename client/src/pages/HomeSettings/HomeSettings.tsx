import React from 'react';
import './style.scss';	
import Greetings from './Greetings/Greetings';
import Trending from './Trending/Trending';
import Discover from './Discover/Discover';
import Nft from './Nft/Nft';

const HomeSettings: React.FC = (): JSX.Element => {
	return (
		<div className="home-settings">
			<h1>Home Settings</h1>
			<div className="home-settings_container">
				<Greetings/>
				<Trending/>
				<Discover/>
				<Nft/>
			</div>
		</div>
	);
};

export default HomeSettings;
