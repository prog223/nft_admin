import React, { useEffect, useState } from 'react';
import User from '../../atoms/User/User';
import SearchInput from '../../atoms/SearchInput/SearchInput';
import axios from '../../../api/axios';
import { CollectionT } from '../../../setup/type';
import CollectionSkeleton from '../../atoms/CollectionSkeleton/CollectionSkeleton';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectContent } from '../../../redux/Content/contentSlice';
import './style.scss';

interface Props {
	content?: any;
	handleClick: (content: any) => void;
}

const SelectCollection: React.FC<Props> = ({
	content,
	handleClick,
}): JSX.Element => {
	const [selected, setSelected] = useState<string>('');
	const [collections, setCollections] = useState<CollectionT[] | null>(null);
	const [collection, setCollection] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { isLoading: contentIsLoading } = useSelector(selectContent);

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
				<span
					className={classNames('material-symbols-outlined', {
						disable: content?.collection?._id === selected || !selected,
					})}
					onClick={() =>
						handleClick({
							selected,
							_id: content?._id,
							id: content?.collection?._id,
						})
					}
				>
					add_circle
				</span>
			</div>
			<div className="collections">
				{isLoading || contentIsLoading ? (
					<CollectionSkeleton />
				) : selected ? (
					<>
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
					</>
				) : (
					<>
						<div className="collections__grid">
							{content?.collection?.nfts[0]?.nft?.map((e: any) => (
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
							<div className="collections__grid__item">
								+{content?.collection?.nfts[0]?.totalCount}
							</div>
						</div>
						<div className="flex">
							<p className="collections__title">
								{content?.collection?.name}
							</p>
							<div className="collections__user">
								<User user={content?.collection?.creator} />
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default SelectCollection;
