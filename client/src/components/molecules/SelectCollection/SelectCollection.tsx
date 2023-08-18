import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../../atoms/User/User';
import SearchInput from '../../atoms/SearchInput/SearchInput';
import axios from '../../../api/axios';
import './style.scss';
import { selectCollections } from '../../../redux/Collection/collectionSlice';
import { CollectionT } from '../../../setup/type';
import CollectionSkeleton from '../../atoms/CollectionSkeleton/CollectionSkeleton';

const SelectCollection: React.FC = (): JSX.Element => {
	const [selected, setSelected] = useState<string>('');
	const [collections, setCollections] = useState<CollectionT[] | null>(null);
	const [collection, setCollection] = useState<CollectionT | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchData = async (search: any = '') => {
		try {
			const response = await axios.get(`collection`, { params: { search } });
			setCollections(response.data.collections);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchCollection = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(`collection/${selected}`);
			if (response.data) {
				setIsLoading(false);
				setCollection(response.data);
			}
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (selected) fetchCollection();
	}, [selected]);

	return (
		<div className="select-nft">
			<div className="select-nft_search">
				<SearchInput
					name="collection"
					field="name"
					options={collections}
					fetch={fetchData}
					onHandleChange={(collection: any) => setSelected(collection)}
				/>
				<span className="material-symbols-outlined">add_circle</span>
			</div>
			<div className="collections">
				{isLoading? <CollectionSkeleton/> : <>
				
				<div className="collections__grid">
					{collection?.nfts?.map((e: any) => (
						<div
							className="collections__grid__item"
							key={e._id}
						>
							<img
								src={e.image}
								alt=""
							/>
						</div>
					))}

					<div className="collections__grid__item">1035+</div>
				</div>
				<div className="flex">
					<p className="collections__title">{collection?.name}</p>
					<div className="collections__user">
						<User user={collection?.creator} />
					</div>
				</div>
				</>}
			</div>
		</div>
	);
};

export default SelectCollection;
