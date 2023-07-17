import { useState, useEffect } from 'react';
import { AdminT } from '../type';

const useGetAdmin = (): AdminT => {
	const [admin, setAdmin] = useState<AdminT>({name: 'admin', surname: ''} as AdminT);

	useEffect(() => {
		const storedAdmin = localStorage.getItem('user');

		if (storedAdmin) {
			const parsedadmin: AdminT = JSON.parse(storedAdmin);
			setAdmin(parsedadmin);
		}
	}, []);

	return admin;
};

export default useGetAdmin;