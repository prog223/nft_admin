import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
	confirmRequest,
	deleteRequest,
	getDashboardInfo,
	getRequests,
} from '../../redux/Info/infoService';
import { selectInfo } from '../../redux/Info/infoSlice';
import Table from '../../components/Table/Table';
import TableBody from '../../components/Table/TableBody';
import { NftT } from '../../setup/type';
import { debounce, sortByProperty, upperCase } from '../../setup/utils';
import TableHeader from '../../components/Table/TableHeader';
import usePagination from '../../setup/hooks/usePagination';
import Modal from '../../components/Modal/Modal';
import DashboardModal from './DashboardModal';
import useGetAdmin from '../../setup/hooks/useGetAdmin';
import './style.scss';

const Dashboard: React.FC = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const admin = useGetAdmin();
	const { data, isLoading } = useSelector(selectInfo);
	const [arr, setData] = useState<Array<NftT>>(data?.requests?.requests);
	const { currentPage, itemsPerPage } = usePagination();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [see, setSee] = useState<NftT | null>(null);

	const [show, setShow] = useState<boolean>(false);
	const [mail, setMail] = useState<string>('');

	const [columns, setColumns] = useState<Array<any>>([
		{ key: 'admin', title: 'Admin' },
		{ key: 'name', title: 'Name' },
		{ key: 'description', title: 'Description' },
	]);
	const [hideArr, setHideArr] = useState<Array<string | number>>([]);

	const fetchData = (search: string = '') => {
		const params = {
			...(search && { search }),
		};

		dispatch(
			getRequests({
				...params,
				page: currentPage,
				limit: itemsPerPage,
				search,
			})
		);
	};

	useEffect(() => {
		dispatch(getDashboardInfo());
		fetchData();
	}, []);

	const search = (text: string) => {
		fetchData(text);
	};

	const optimizedFn = useCallback(debounce(search), []);

	useEffect(() => {
		setData(data?.requests?.requests);
	}, [data?.requests]);

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

	const showModal = (item: any) => {
		setSee(item);
		setIsOpen(true);
	};

	const onDelete = () => {
		if (mail) {
			dispatch(
				deleteRequest({
					id: see?._id,
					text: mail,
					email: see?.admin?.email,
				})
			);
			setShow(false);
			setMail('');
			setIsOpen(false);
			fetchData();
		} else {
			setShow(true);
		}
	};

	const onConfirm = () => {
		if (see?._id) dispatch(confirmRequest(see._id));
		setIsOpen(false);
		fetchData();
	};

	return (
		<>
			<Modal
				title="Request Information"
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				buttons={[
					{ button: 'Confirm', action: onConfirm },
					{ button: 'Delete', action: onDelete, variant: 'second' },
				]}
			>
				<div className="dashboard-modal">
					{see?.name && (
						<DashboardModal
							request={see}
							show={show}
							onMailChange={(e: any) => setMail(e.target.value)}
						/>
					)}
				</div>
			</Modal>
			<div className="dashboard">
				<div>
					<h1>Dashboard</h1>
				</div>
				<div className="dashboard__container">
					<div className="dashboard__container__info">
						<div className="dashboard__container__info__item">
							<span className="material-symbols-outlined">group</span>
							<div>
								<h3>Users</h3>
								<p>{data?.info?.usersCount}</p>
							</div>
						</div>
						<div className="dashboard__container__info__item">
							<span className="material-symbols-outlined">
								rocket_launch
							</span>
							<div>
								<h3>Nfts</h3>
								<p>{data?.info?.nftsCount}</p>
							</div>
						</div>
						<div className="dashboard__container__info__item">
							<span className="material-symbols-outlined">
								library_books
							</span>
							<div>
								<h3>Collections</h3>
								<p>{data?.info?.collectionsCount}</p>
							</div>
						</div>
					</div>
					<div className="dashboard__container__requests">
						{data?.requests?.requests.length ? (
							<>
								<div className="nfts__chekbox checkbox">
									<input
										type="text"
										placeholder="name"
										onChange={(e) => optimizedFn(e.target.value)}
										className="nfts__chekbox__search"
									/>
								</div>
								<Table>
									<TableHeader
										columns={columns}
										filter={filter}
										reset={() => setData(data?.requests?.requests)}
									/>
									<TableBody
										data={arr}
										columns={columns}
										handleFilterChange={handleFilterChange}
										isLoading={true}
										hide={false}
										actionButton={
											admin.isSuper && {
												text: 'See',
												action: showModal,
											}
										}
									/>
								</Table>
							</>
						) : (
							<h2>No requests</h2>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
