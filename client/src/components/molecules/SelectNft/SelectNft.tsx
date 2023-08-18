import React, { useEffect, useState } from 'react';
import SearchInput from '../../atoms/SearchInput/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { getNft, getNfts } from '../../../redux/Nft/nftService';
import { selectNfts } from '../../../redux/Nft/nftSlice';
import Box from '../../atoms/Box/Box';
import './style.scss';

interface Props {
	size?: 'sm' | 'bg';
}
	
const SelectNft: React.FC<Props> = ({ size }) => {
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
		<div className="select-nft">
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
			<div className="select-nft_nft">
				<Box
					img={nft?.data?.image}
					title={nft?.data?.name}
					size={size}
					user={nft?.data?.creator}
				/>
			</div>
		</div>
	);
};

export default SelectNft;
