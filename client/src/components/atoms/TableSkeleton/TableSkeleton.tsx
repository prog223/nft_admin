import React from 'react';
import './style.scss';

interface Props {
	count: Number;
}

const TableSkeleton: React.FC<Props> = ({ count }: Props): JSX.Element => {
	return (
		<div className='table-skeleton_container'>
			{Array(count)
				.fill(0)
				.map((e, i) => (
					<div
						className="table-skeleton"
						key={i}
					></div>
				))}
		</div>
	);
};

export default TableSkeleton;
