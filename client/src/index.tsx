import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastProvider } from './components/atoms/Toast/ToastProvider';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<ToastProvider>
		<Provider store={store}>
			<App />
		</Provider>
	</ToastProvider>
);

reportWebVitals();
