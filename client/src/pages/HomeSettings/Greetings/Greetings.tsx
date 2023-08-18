import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';
import Button from '../../../components/atoms/Button/Button';
import SelectNft from '../../../components/molecules/SelectNft/SelectNft';

const Greetings: React.FC = (): JSX.Element => {
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
				<SelectNft />
			</div>
		</div>
	);
};

export default Greetings;
