import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { NftT } from '../../setup/type';
import { debounce, sortByProperty, upperCase } from '../../setup/utils';
import { AppDispatch } from '../../redux/store';
import Table from '../../components/atoms/Table/Table';
import TableHeader from '../../components/atoms/Table/TableHeader';
import TableBody from '../../components/atoms/Table/TableBody';
import Button from '../../components/atoms/Button/Button';
import Pagination from '../../components/atoms/Pagination/Pagination';
import usePagination from '../../setup/hooks/usePagination';
import TableSkeleton from '../../components/atoms/TableSkeleton/TableSkeleton';
import Modal from '../../components/molecules/Modal/Modal';
import { deleteUsers, getUsers } from '../../redux/User/userService';
import { selectUsers } from '../../redux/User/userSlice';
import './style.scss';

const Users: React.FC = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, isLoading } = useSelector(selectUsers);
	const [searchParams] = useSearchParams();
	const [arr, setData] = useState<Array<NftT>>(data?.users);
	const { currentPage, itemsPerPage } = usePagination();
	const [columns, setColumns] = useState<Array<any>>([]);
	const [columnsClone, setColumnsClone] = useState<Array<any>>([]);
	const [hideArr, setHideArr] = useState<Array<string | number>>([]);
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
				{!!arr?.length || isLoading ? (
					<>
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
								<TableSkeleton count={6} />
							) : arr?.length ? (
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
							) : (
								<div className="nfts__table__wrap_message">
									Not found
								</div>
							)}
						</div>
						<div className="nfts__table__btns">
							<div className='nfts__table__btns_pagination'>
								<Pagination total={data?.pagination?.total} />
							</div>
							<div className="nfts__table__btns_cont">
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
				) : (
					<div style={{ padding: '40px', textAlign: 'center' }}>
						No users yet
					</div>
				)}
			</div>
		</>
	);
};

export default Users;
