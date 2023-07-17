import { BrowserRouter } from 'react-router-dom';
import { UseRoutes } from './routes';
import { AxiosInterceptor } from '../../api/axios';

export const Router: React.FC = (): JSX.Element => {
	return (
		<div>
			<BrowserRouter>
				<AxiosInterceptor>
					<UseRoutes />
				</AxiosInterceptor>
			</BrowserRouter>
		</div>
	);
};
