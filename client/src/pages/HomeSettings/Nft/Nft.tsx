import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Eye } from '../../../assets/images/Eye.svg';
import NFT from '../../../assets/images/NFT.png';
import './style.scss';
import SearchInput from '../../../components/atoms/SearchInput/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { selectNfts } from '../../../redux/Nft/nftSlice';
import { getNft, getNfts } from '../../../redux/Nft/nftService';
import Button from '../../../components/atoms/Button/Button';

const Nft: React.FC = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, nft } = useSelector(selectNfts);
	const fetchData = (search: string = '') => {
		dispatch(getNfts({ search }));
	};
	const [selected, setSelected] = useState<any>('');

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (selected) dispatch(getNft(selected));
	}, [selected]);
	return (
		<div className='cont'>
			<div className="select-nft_search">
				<SearchInput
					name="nft"
					field="name"
					options={data?.nfts}
					fetch={fetchData}
					onHandleChange={(nft: any) => setSelected(nft)}
				/>
				<span className="material-symbols-outlined">add_circle</span>
			</div>
			<div className="nft">
				<img
					src={nft?.data?.image}
					className="bg-img"
				/>
				<div className="nft__container container">
					<div className="nft__info">
						<div className="nft__info__creator">
							<span></span>
							{nft?.data?.creator?.username}
						</div>
						<div className="nft__info__title">{nft?.data?.name}</div>
						<div className="nft__info__btn">
							<Button variant="white">See NFT</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Nft;
