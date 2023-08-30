import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNfts } from '../../redux/Nft/nftSlice';
import { useSearchParams } from 'react-router-dom';
import { NftT } from '../../setup/type';
import { debounce, sortByProperty, upperCase } from '../../setup/utils';
import { deleteNfts, getNfts } from '../../redux/Nft/nftService';
import { AppDispatch } from '../../redux/store';
import Table from '../../components/atoms/Table/Table';
import TableHeader from '../../components/atoms/Table/TableHeader';
import TableBody from '../../components/atoms/Table/TableBody';
import Button from '../../components/atoms/Button/Button';
import Pagination from '../../components/atoms/Pagination/Pagination';
import usePagination from '../../setup/hooks/usePagination';
import TableSkeleton from '../../components/atoms/TableSkeleton/TableSkeleton';
import Modal from '../../components/molecules/Modal/Modal';
import './style.scss';

const Nfts: React.FC = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, isLoading } = useSelector(selectNfts);
	const [searchParams] = useSearchParams();
	const [arr, setData] = useState<Array<NftT>>(data?.nfts);
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
			getNfts({ ...params, page: currentPage, limit: itemsPerPage, search })
		);
	};

	useEffect(() => {
		fetchData();
	}, [searchParams, currentPage]);

	useEffect(() => {
		if (data?.nfts?.length) {
			const col = Object.keys(data.nfts[0])
				.filter((e) => e != '_id' && e != 'creator')
				.map((key) => {
					return {
						key: key,
						title: upperCase(key).replace('Id', ' '),
					};
				});
			setColumns(col);
			!columnsClone.length && setColumnsClone(col.slice(0, 4));
		}

		setData(
			data?.nfts?.map((e: any) => ({
				...e,
				collectionId: e.collectionId.name,
			}))
		);
	}, [data?.nfts]);

	const filter = (value: string, bool: boolean) => {
		const sortedData = [...arr].sort(sortByProperty(value, bool));
		setData([...sortedData]);
	};

	const handleOnChange = (e: any) => {
		if (e.target.checked) {
			setColumnsClone([
				...columnsClone,
				{
					key: e.target.value,
					title: upperCase(e.target.value),
				},
			]);
		} else {
			setColumnsClone([
				...columnsClone.filter((filter) => filter.key !== e.target.value),
			]);
		}
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
			dispatch(deleteNfts(hideArr)).then((res) => {
				if (res.payload) {
					fetchData();
					setIsOpen(false);
				}
			});
		else setIsOpen(false);
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
			<div className="nfts">
				<div>
					<h1>Nfts</h1>
				</div>
				{!!arr?.length ? (
					<>
						<div className="nfts__chekbox checkbox">
							{[...columns].splice(4).map((e: any, i: number) => {
								return (
									<div key={i}>
										<input
											type="checkbox"
											id={e.key}
											name={e.key}
											onChange={handleOnChange}
											value={e.key}
										/>
										<label htmlFor={e.key}>{e.title}</label>
									</div>
								);
							})}
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
							) : (
								<>
									<Table>
										<TableHeader
											columns={columnsClone}
											filter={filter}
											reset={() => setData(data?.nfts)}
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
						<>
							{!isLoading && (
								<div className="nfts__table__btns">
									<div className="nfts__table__btns_pagination">
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
							)}
						</>
					</>
				) : (
					<div style={{ padding: '40px', textAlign: 'center' }}>
						No nfts yet
					</div>
				)}
			</div>
		</>
	);
};

export default Nfts;
