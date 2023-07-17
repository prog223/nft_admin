import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNfts } from '../../redux/Nft/nftSlice';
import { useSearchParams } from 'react-router-dom';
import { NftT } from '../../setup/type';
import { debounce, sortByProperty, upperCase } from '../../setup/utils';
import { deleteNfts, getNfts } from '../../redux/Nft/nftService';
import { AppDispatch } from '../../redux/store';
import Table from '../../components/Table/Table';
import TableHeader from '../../components/Table/TableHeader';
import TableBody from '../../components/Table/TableBody';
import Button from '../../components/Button/Button';
import Pagination from '../../components/Pagination/Pagination';
import usePagination from '../../setup/hooks/usePagination';
import TableSkeleton from '../../components/TableSkeleton/TableSkeleton';
import Modal from '../../components/Modal/Modal';
import { deleteUsers, getUsers } from '../../redux/User/userService';
import { selectUsers } from '../../redux/User/userSlice';
import './style.scss';

const Users: React.FC = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, isLoading } = useSelector(selectUsers);
	const [searchParams, setSearchParams] = useSearchParams();
	const [arr, setData] = useState<Array<NftT>>(data?.users);
	const { currentPage, itemsPerPage } = usePagination();

	const [columns, setColumns] = useState<Array<any>>([]);
	const [columnsClone, setColumnsClone] = useState<Array<any>>([]);

	const [hideArr, setHideArr] = useState<Array<string | number>>([]);
	// const [reset, setReset] = useState(true);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const fetchData = (search: string = '') => {
		const params = {
			...(search && { search }),
		};

		dispatch(
			getUsers({ ...params, page: currentPage, limit: itemsPerPage, search })
		);
	};

	useEffect(() => {
		fetchData();
	}, [searchParams, currentPage]);

	useEffect(() => {
		if (data?.users?.length) {
			const col = Object.keys(data.users[0])
				.filter((e) => e != '_id' && e != 'avatar')
				.map((key) => {
					return {
						key: key,
						title: upperCase(key).replace('_', ' '),
					};
				});
			setColumns(col);
			!columnsClone.length && setColumnsClone(col.slice(0, 4));
		}
		setData(data?.users);
	}, [data?.users]);

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

	const hide = () => {
		setData([...arr.filter((e: any) => !hideArr.includes(e._id.toString()))]);
		setHideArr([]);
	};

	const onDelete = () => {
		if (hideArr.length)
			dispatch(deleteUsers(hideArr)).then((res) => {
				if (res.payload) {
					fetchData();
					setIsOpen(false);
				}
			});
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
				buttons={[{ button: 'Yes', action: onDelete }]}
			>
				<div>
					<h1>Are you sure?</h1>
				</div>
			</Modal>
			<div className="nfts">
				<div>
					<h1>Users</h1>
				</div>
				<div className="nfts__chekbox checkbox">
					<input
						type="text"
						placeholder="name"
						onChange={(e) => optimizedFn(e.target.value)}
						className="nfts__chekbox__search"
					/>
				</div>
				<div className="nfts__table__wrap">
					{isLoading ? (
						<TableSkeleton count={9} />
					) : (
						<>
							<Table>
								<TableHeader
									columns={columnsClone}
									filter={filter}
									reset={() => setData(data?.users)}
								/>
								<TableBody
									data={arr}
									columns={columnsClone}
									handleFilterChange={handleFilterChange}
									isLoading={true}
								/>
							</Table>
						</>
					)}
				</div>
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
			</div>
		</>
	);
};

export default Users;
