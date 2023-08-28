import React, { useEffect, useState } from 'react';
import SearchInput from '../../atoms/SearchInput/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { getNft, getNfts } from '../../../redux/Nft/nftService';
import { selectNfts } from '../../../redux/Nft/nftSlice';
import Box from '../../atoms/Box/Box';
import { NftT } from '../../../setup/type';
import axios from '../../../api/axios';
import BoxSkeleton from '../../atoms/BoxSkeleton/BoxSkeleton';
import { selectContent } from '../../../redux/Content/contentSlice';
import classNames from 'classnames';
import './style.scss';

interface Props {
	size?: 'sm' | 'bg';
	content?: { _id?: string; nft: NftT };
	handleClick: (data: any) => void;
}

const SelectNft: React.FC<Props> = ({ size, content, handleClick }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { data } = useSelector(selectNfts);
	const [nftData, setNftData] = useState<NftT | null>(null);
	const [selected, setSelected] = useState<any>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { isLoading: contentIsLoading } = useSelector(selectContent);

	const fetchData = (search: string = '') => {
		dispatch(getNfts({ search }));
	};

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
				<span
					className={classNames('material-symbols-outlined', {
						disable: content?.nft?._id === selected || !selected,
					})}
					onClick={() => handleClick({ selected, _id: content?._id, id: content?.nft?._id})}
				>
					add_circle
				</span>
			</div>
			<div className="select-nft_nft">
				{isLoading || contentIsLoading ? (
					<>
						<BoxSkeleton count={1} />
					</>
				) : !selected && content ? (
					<Box
						img={content?.nft?.image}
						title={content?.nft?.name}
						size={size}
						user={content?.nft?.creator}
					/>
				) : (
					<Box
						img={nftData?.image}
						title={nftData?.name}
						size={size}
						user={nftData?.creator}
					/>
				)}
			</div>
		</div>
	);
};

export default SelectNft;
