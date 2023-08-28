import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../setup/hooks/useToast';

interface Props {
	children: any;
}

const instance = axios.create({
	baseURL: 'http://localhost:8000/api/',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://localhost:3000',
	},
});

export const AxiosInterceptor: React.FC<Props> = ({ children }: Props) => {
	const navigate = useNavigate();
	const [isSet, setIsSet] = useState(false);
	const toast = useToast();

	useEffect(() => {
		setIsSet(true);
		const resInterceptor = (response: AxiosResponse) => {
			return response;
		};

		const errInterceptor = (error: AxiosError) => {
			if (error.response && error.response.status === 401) {
				navigate('/');
				localStorage.removeItem('user');
				const message: any = error.response.data;
				toast?.open(message);
			}
			
			return Promise.reject(error);
		};

		const interceptor = instance.interceptors.response.use(
			resInterceptor,
			errInterceptor
		);

		return () => instance.interceptors.response.eject(interceptor);
	}, []);

	return isSet && children;
};

export default instance;
