import usePagination from '../../../setup/hooks/usePagination';
import Button from '../Button/Button';
import TableRowCell from './TableRowCell';

interface Props<T> {
	data: T[];
	columns: any;
	handleFilterChange: (e: any) => void;
	isLoading?: boolean;
	hide?: boolean;
	actionButton?: {
		text: string;
		action: Function;
	} | false;
}

const TableBody = <T,>({
	data,
	columns,
	handleFilterChange,
	hide = true,
	actionButton,
}: Props<T>): JSX.Element => {
	const { currentPage, itemsPerPage } = usePagination();
	return (
		<tbody>
			{data?.map((item: any, i: number) => (
				<tr key={item._id}>
					<td className="top-creators__table_number">
						<span>{i + 1 + itemsPerPage * (currentPage - 1)}</span>
					</td>
					{columns.map((column: any, columnIndex: number) => (
						<TableRowCell
							key={`table-row-cell-${columnIndex}`}
							item={item}
							column={column}
						/>
					))}
					<td
						style={{ width: '5%' }}
						className="checkbox"
					>
						{hide && (
							<input
								type="checkbox"
								onChange={handleFilterChange}
								value={item._id}
							/>
						)}
						<div>{actionButton && (
							<Button size='small' onClick={()=>actionButton.action(item)}>{actionButton.text}</Button>
						)}</div>
					</td>
				</tr>
			))}
		</tbody>
	);
};

export default TableBody;
