import { ReactNode } from 'react';
import './style.scss';

interface Props<T> {
	children: ReactNode;
}

const Table = <T,>({ children }: Props<T>): JSX.Element => {
	return <table>{children}</table>;
};

export default Table;
