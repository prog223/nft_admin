import React from 'react';
import './style.scss';

interface Props {
	count?: Number;
}

const BoxSkeleton: React.FC<Props> = ({ count }: Props): JSX.Element => {
	return (
		<>
			{Array(count ?? 1)
				.fill(0)
				.map((e, i) => (
					<div
						className="skeleton-box"
						key={i}
					></div>
				))}
		</>
	);
};

export default BoxSkeleton;
