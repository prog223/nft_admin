import React from 'react';
import './App.scss';
import { Router } from './setup/router/Router';
import { ChatProvider } from './setup/contexts/socketContext';

const App: React.FC = (): JSX.Element => {
	return (
		<div className="App">
			<ChatProvider>
				<Router />
			</ChatProvider>
		</div>
	);
};

export default App;
