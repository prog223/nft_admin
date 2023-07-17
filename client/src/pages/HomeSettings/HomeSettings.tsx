import React, { useEffect, useState } from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { selectNfts } from '../../redux/Nft/nftSlice';
import { selectCollections } from '../../redux/Collection/collectionSlice';
import { AppDispatch } from '../../redux/store';
import { getNfts } from '../../redux/Nft/nftService';
import { getCollections } from '../../redux/Collection/collectionService';
import { selectUsers } from '../../redux/User/userSlice';
import { getUsers } from '../../redux/User/userService';
import './style.scss';
import { CollectionT, NftT, UserT } from '../../setup/type';

const HomeSettings: React.FC = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const nfts = useSelector(selectNfts);
	const collections = useSelector(selectCollections);
	const users = useSelector(selectUsers);

	const [nftSelect, setNftSelect] = useState<string | null>(null);
	const [collectionSelect, setColllectionSelect] = useState<string | null>(
		null
	);
	const [userSelect, setUserSelect] = useState<string | null>(null);

	const [data, setData] = useState<{
		greetings: NftT | null;
		collections: CollectionT[];
		creators: UserT[];
		nfts: NftT[];
		nft: NftT | null;
	}>({
		greetings: null,
		collections: [],
		creators: [],
		nfts: [],
		nft: null,
	});

	const fetchNfts = (search: string = '') => {
		const params = {
			...(search && { search }),
		};

		dispatch(getNfts({ ...params, limit: 20 }));
	};

	const fetchCollections = (search: string = '') => {
		const params = {
			...(search && { search }),
		};

		dispatch(getCollections({ ...params, limit: 20 }));
	};

	const fetchUsers = (search: string = '') => {
		dispatch(getUsers({ search }));
	};

	useEffect(() => {
		fetchNfts();
		fetchCollections();
		fetchUsers();
	}, []);

	const filterData = (name: string) => {
		switch (name) {
			case 'greetings':
				setData({
					...data,
					greetings: nfts.data?.nfts.find(
						(e: NftT) => e._id === nftSelect
					),
				});
				break;
			case 'collections':
				
				break;
		}
	};

	console.log(data);

	return (
		<div className="home-settings">
			<div>
				<h1>Home Settings</h1>
			</div>
			<div className="home-settings__form">
				<form>
					<SearchInput
						name="nft"
						options={nfts.data?.nfts}
						field="name"
						fetch={fetchNfts}
						onChange={(option: string) => setNftSelect(option)}
					/>
					<SearchInput
						name="collection"
						options={collections?.data?.collections}
						field="name"
						fetch={fetchCollections}
						onChange={(option: string) => setColllectionSelect(option)}
					/>
					<SearchInput
						name="users"
						options={users?.data?.users}
						field="username"
						fetch={fetchUsers}
						onChange={(option: string) => setUserSelect(option)}
					/>
				</form>
			</div>
			<div className="home-settings__greetings">
				{data.greetings && (
					<>
						<h1>{data.greetings.name}</h1>
						<img src={data.greetings.image} />
					</>
				)}
				<button onClick={() => filterData('greetings')}>Add</button>
			</div>
			<div className="home-settings__collections">
				{data.collections.map((e: CollectionT) => {
					return <div>{e?.description}</div>;
				})}
				<button onClick={() => filterData('collections')}>Collection</button>
			</div>
		</div>
	);
};

export default HomeSettings;
