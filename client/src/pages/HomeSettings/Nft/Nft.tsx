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
import { selectContent } from '../../../redux/Content/contentSlice';
import axios from '../../../api/axios';
import { NftT } from '../../../setup/type';
import { updateContent } from '../../../redux/Content/contentService';

const Nft: React.FC = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, isLoading: nftIsLoading } = useSelector(selectNfts);
	const { data: nft, isLoading: contentIsLoading } = useSelector(selectContent);
	const fetchData = (search: string = '') => {
		dispatch(getNfts({ search }));
	};
	const [nftData, setNftData] = useState<NftT | null>(null);
	const [selected, setSelected] = useState<any>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchNft = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(`nft/${selected}`);
			if (response.data) {
				setIsLoading(false);
				setNftData(response.data);
			}
		} catch (err) {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (selected) {
			dispatch(getNft(selected));
			fetchNft();
		}
	}, [selected]);

	const handleClick = () => {
		dispatch(
			updateContent({
				single: selected,
			})
		);
	};

	return (
		<div className="cont">
			<div className="select-nft_search">
				<SearchInput
					name="nft"
					field="name"
					options={data?.nfts}
					fetch={fetchData}
					onHandleChange={(nft: any) => setSelected(nft)}
				/>
				<span
					className="material-symbols-outlined"
					onClick={handleClick}
				>
					add_circle
				</span>
			</div>
			{isLoading || contentIsLoading ? (
				<div className="loading-cont">
					<div className="loading"></div>
				</div>
			) : (
				<>
					{selected ? (
						<>
							<div className="nft">
								<img
									src={nftData?.image}
									className="bg-img"
								/>
								<div className="nft__container container">
									<div className="nft__info">
										<div className="nft__info__creator">
											<span></span>
											{nftData?.creator?.username}
										</div>
										<div className="nft__info__title">
											{nftData?.name}
										</div>
										<div className="nft__info__btn">
											<Button variant="white">See NFT</Button>
										</div>
									</div>
								</div>
							</div>
						</>	
					) : (
						<>
							<div className="nft">
								<img
									src={nft?.single?.image}
									className="bg-img"
								/>
								<div className="nft__container container">
									<div className="nft__info">
										{nft?.single?.creator?.username && (
											<div className="nft__info__creator">
												<span></span>
												{nft.single.creator.username}
											</div>
										)}
										<div className="nft__info__title">
											{nft?.single?.name}
										</div>
										<div className="nft__info__btn">
											<Button variant="white">See NFT</Button>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Nft;
