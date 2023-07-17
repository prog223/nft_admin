import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
	deleteCollections,
	getCollections,
} from '../../redux/Collection/collectionService';
import { selectCollections } from '../../redux/Collection/collectionSlice';
import TableSkeleton from '../../components/TableSkeleton/TableSkeleton';
import Table from '../../components/Table/Table';
import TableHeader from '../../components/Table/TableHeader';
import TableBody from '../../components/Table/TableBody';
import Pagination from '../../components/Pagination/Pagination';
import { CollectionT } from '../../setup/type';
import { debounce, sortByProperty } from '../../setup/utils';
import usePagination from '../../setup/hooks/usePagination';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import './style.scss';

const Collections: React.FC = (): JSX.Element => {
	const { data, isLoading } = useSelector(selectCollections);
	const dispatch = useDispatch<AppDispatch>();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [hideArr, setHideArr] = useState<Array<string | number>>([]);
	const [arr, setData] = useState<Array<CollectionT>>(data?.collections);
	const { currentPage, itemsPerPage } = usePagination();

	const fetchData = (search: string = '') => {
		const params = {
			...(search && { search }),
		};

		dispatch(
			getCollections({
				...params,
				page: currentPage,
				limit: itemsPerPage,
				search,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setData(data?.collections);
	}, [data?.collections]);

	const filter = (value: string, bool: boolean) => {
		const sortedData = [...arr].sort(sortByProperty(value, bool));
		setData([...sortedData]);
	};

	const handleFilterChange = (e: any) => {
		if (e.target.checked) {
			setHideArr([...hideArr, e.target.value]);
		} else {
			setHideArr([...hideArr.filter((filter) => filter !== e.target.value)]);
		}
	};

	const [columns, setColumns] = useState<Array<any>>([
		{ key: 'creator', title: 'Creator' },
		{ key: 'name', title: 'Name' },
		{ key: 'description', title: 'Description' },
	]);

	const onDelete = () => {
		if (hideArr.length)
			dispatch(deleteCollections(hideArr)).then((res) => {
				if (res.payload) {
					fetchData();
					setIsOpen(false);
				}
			});
		else setIsOpen(false);
	};

	const hide = () => {
		setData([...arr.filter((e: any) => !hideArr.includes(e._id.toString()))]);
		setHideArr([]);
	};

	const search = (text: string) => {
		fetchData(text);
	};

	const optimizedFn = useCallback(debounce(search), []);

	return (
		<>
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				buttons={[{ button: 'delete', action: onDelete }]}
			>
				<div>
					<h1>Do you want to delete?</h1>
				</div>
			</Modal>
			<div className="collection">
				<div>
					<h1>Collections</h1>
				</div>
				<div className="collection__wrap">
					<div className="nfts__chekbox checkbox">
						<input
							type="text"
							placeholder="name"
							onChange={(e) => optimizedFn(e.target.value)}
							className="nfts__chekbox__search"
						/>
					</div>
					<div className="collection__table">
						<div className="nfts__table__wrap">
							{isLoading ? (
								<TableSkeleton count={9} />
							) : (
								<>
									<Table>
										<TableHeader
											columns={columns}
											filter={filter}
											reset={() => setData(data?.collections)}
										/>
										<TableBody
											data={arr}
											columns={columns}
											handleFilterChange={handleFilterChange}
											isLoading={true}
										/>
									</Table>
								</>
							)}
						</div>
						{!isLoading && (
							<div className="nfts__table__btns">
								<div>
									<Pagination total={data?.pagination?.total} />
								</div>
								<Button
									onClick={hide}
									size="small"
								>
									Hide
								</Button>
								<Button
									onClick={() => setIsOpen(true)}
									size="small"
									variant="second"
								>
									Delete
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Collections;
