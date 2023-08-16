import { useEffect, useRef } from 'react';

type TimeoutCallback = () => void;

export const useTimeout = (
	callback: TimeoutCallback,
	delay: number | null
): void => {
	const savedCallback = useRef<TimeoutCallback>(callback);
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		if (delay === null) return;
		const id = setTimeout(() => savedCallback.current(), delay);
		return () => clearTimeout(id);
	}, [delay]);
};
