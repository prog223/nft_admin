import React from 'react';
import SelectNft from '../../../components/molecules/SelectNft/SelectNft';
import { useDispatch, useSelector } from 'react-redux';
import { selectContent } from '../../../redux/Content/contentSlice';
import { AppDispatch } from '../../../redux/store';
import { updateContent } from '../../../redux/Content/contentService';
import './style.scss';

const Discover: React.FC = (): JSX.Element => {
	const { data } = useSelector(selectContent);
	const dispatch = useDispatch<AppDispatch>();
	const findByPosition = (number: number) => {
		const find = data?.discover.find((e: any) => e.position == number);
		return find;
	};

	const handleClick = (nft: any) => {
		if (nft.selected && nft.id !== nft.selected) {
			dispatch(
				updateContent({
					discover: { _id: nft._id, nft: nft.selected },
				})
			);
		}
	};

	return (
		<div className="discover container section">
			<div className="section-title">
				<h2>Discover More NFTs</h2>
				<p>Explore new trending NFTs</p>
			</div>

			<div className="discover__grid">
				<SelectNft
					size="sm"
					content={findByPosition(1)}
					handleClick={handleClick}
				/>
				<SelectNft
					size="sm"
					content={findByPosition(2)}
					handleClick={handleClick}
				/>
				<SelectNft
					size="sm"
					content={findByPosition(3)}
					handleClick={handleClick}
				/>
			</div>
		</div>
	);
};

export default Discover;
