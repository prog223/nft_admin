import React from 'react';
import Button from '../../../components/atoms/Button/Button';
import SelectNft from '../../../components/molecules/SelectNft/SelectNft';
import { useDispatch, useSelector } from 'react-redux';
import { selectContent } from '../../../redux/Content/contentSlice';
import { updateContent } from '../../../redux/Content/contentService';
import { AppDispatch } from '../../../redux/store';
import './style.scss';

const Greetings: React.FC = (): JSX.Element => {
	const { data } = useSelector(selectContent);
	const dispatch = useDispatch<AppDispatch>();
	const handleClick = (content: any) => {
		if (content.selected && data?.greetings?._id !== content.selected) {
			dispatch(updateContent({ greetings: content.selected }));
		}
	};
	return (
		<div className="greetings container">
			<div className="greetings__text">
				<h1>Discover digital art & Collect NFTs</h1>
				<p>
					NFT marketplace UI created with Anima For Figma. Collect, buy and
					sell art from more than 20k NFT artists.
				</p>
			</div>
			<div className="greetings__start">
				<div className="greetings__start__btn">
					<Button>Get Started</Button>
				</div>
				<div className="greetings__start__inf">
					<div className="greetings__start__inf__item">
						<p>240k+</p>
						<p>Total Sale</p>
					</div>
					<div className="greetings__start__inf__item">
						<p>100k+</p>
						<p>Auctions</p>
					</div>
					<div className="greetings__start__inf__item">
						<p>240k+</p>
						<p>Artists</p>
					</div>
				</div>
			</div>

			<div className="greetings__box">
				<SelectNft
					content={{ nft: data?.greetings }}
					handleClick={handleClick}
				/>
			</div>
		</div>
	);
};

export default Greetings;
