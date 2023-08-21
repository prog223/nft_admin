import React, { useEffect } from 'react';
import './style.scss';
import SelectCollection from '../../../components/molecules/SelectCollection/SelectCollection';
import { useDispatch, useSelector } from 'react-redux';
import { selectContent } from '../../../redux/Content/contentSlice';
import { AppDispatch } from '../../../redux/store';
import { updateContent } from '../../../redux/Content/contentService';

const Trending: React.FC = (): JSX.Element => {
	const { data } = useSelector(selectContent);
	const dispatch = useDispatch<AppDispatch>();

	const findByPosition = (number: number) => {
		const find = data?.trending.find((e: any) => e.position == number);
		return find;
	};

	const handleClick = (content: any) => {
		
		dispatch(
			updateContent({
				trending: { _id: content._id, collection: content.selected },
			})
		);
	};

	return (
		<div className="trending container section">
			<div className="section-title">
				<h2>Trending Collection</h2>
				<p>Checkout Our Weekly Updated Trending Collection.</p>
			</div>
			<div className="trending__collections">
				<SelectCollection handleClick={handleClick} content={findByPosition(1)} />
				<SelectCollection handleClick={handleClick} content={findByPosition(2)} />
				<SelectCollection handleClick={handleClick} content={findByPosition(3)} />
			</div>
		</div>
	);
};

export default Trending;
