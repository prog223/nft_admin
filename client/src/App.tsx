import React from 'react';
import './App.scss';
import { Router } from './setup/router/Router';

const App: React.FC = ():JSX.Element => {
	return (
		<div className="App">
			<Router/>
		</div>
	);
};

export default App;
