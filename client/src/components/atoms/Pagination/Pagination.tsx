import classNames from 'classnames';
import React from 'react';
import usePagination from '../../../setup/hooks/usePagination';
import './style.scss';

interface Props {
	total: number;
}

const range = (start: number, end: number) => {
	const arr: any = Array(end - start).keys();
	return [...arr].map((el) => el + start);
};

const getPagesCut = ({
	pagesCount,
	pagesCutCount,
	currentPage,
}: {
	pagesCount: number;
	pagesCutCount: number;
	currentPage: number;
}) => {
	const ceiling = Math.ceil(pagesCutCount / 2);
	const floor = Math.floor(pagesCutCount / 2);

	if (pagesCount < pagesCutCount) {
		return { start: 1, end: pagesCount + 1 };
	} else if (currentPage >= 1 && currentPage <= ceiling) {
		return { start: 1, end: pagesCutCount + 1 };
	} else if (currentPage + floor >= pagesCount) {
		return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
	} else {
		return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
	}
};

const PaginationItem = ({
	page,
	currentPage,
	onPageChange,
	disable,
}: {
	page: number | string;
	currentPage: number;
	onPageChange: Function;
	disable?: boolean;
}) => {
	const liClasses = classNames(
		'page-item',
		{ active: page == currentPage },
		{ disabled: disable }
	);

	return (
		<li
			className={liClasses}
			onClick={() => onPageChange(page)}
		>
			<span className="page-link">{page}</span>
		</li>
	);
};

const Pagination: React.FC<Props> = ({ total }: Props): JSX.Element => {
	const { currentPage, itemsPerPage, updatePage, updatePerPage } =
		usePagination();
	const pagesCount = Math.ceil(total / itemsPerPage);
	const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 5, currentPage });


	if (pagesCount < currentPage && pagesCount != 0	) {
		updatePage(pagesCount);
	}

	const pages = range(pagesCut.start, pagesCut.end);
	const isFirstPage = currentPage === 1 || pages.length === 1;
	const isLastPage = currentPage === pagesCount || pages.length === 1;

	if ((pagesCount === 1 && total <= 6)  || (pagesCount === 0 && total <= 6)) return <></>;

	return (
		<div className="pagination-container">
			<ul className="pagination">
				<PaginationItem
					page="<<"
					currentPage={currentPage}
					onPageChange={() => updatePage(1)}
					disable={isFirstPage}
				/>
				<PaginationItem
					page="<"
					currentPage={currentPage}
					onPageChange={() => updatePage(currentPage - 1)}
					disable={isFirstPage}
				/>

				{pages.map((page) => (
					<PaginationItem
						page={page}
						key={page}
						currentPage={currentPage}
						onPageChange={updatePage}
						disable={page === currentPage || pages.length === 1}
					/>
				))}

				<PaginationItem
					page=">"
					currentPage={currentPage}
					onPageChange={() => updatePage(currentPage + 1)}
					disable={isLastPage}
				/>
				<PaginationItem
					page=">>"
					currentPage={currentPage}
					onPageChange={() => updatePage(pagesCount)}
					disable={isLastPage}
				/>
			</ul>
			<div>
				<select
					value={itemsPerPage}
					onChange={(e: any) => updatePerPage(parseInt(e.target.value))}
					className="pagination__select"
				>
					<option value="6">6 per page</option>
					<option value="12">12 per page</option>
					<option value="24">24 per page</option>
					<option value="48">48 per page</option>
				</select>
			</div>
		</div>
	);
};

export default Pagination;
