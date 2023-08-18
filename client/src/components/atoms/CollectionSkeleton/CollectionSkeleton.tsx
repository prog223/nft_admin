import React from 'react';
import './style.scss';

const CollectionSkeleton: React.FC = (): JSX.Element => {
	return (
		<>
			{Array(1)
				.fill('')
				.map((e:string, i:number) => (
					<div className="collections" key={i}>
						<div className="collections__grid">
							{Array(4)
								.fill('')
								.map((e:string, ind:number) => {
									return <div className="collection-skeleton" key={ind}></div>;
								})}
						</div>
					</div>
				))}
		</>
	);
};

export default CollectionSkeleton;
