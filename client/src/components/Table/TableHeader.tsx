import React from 'react';
import TableHeaderCell from './TableHeaderCell';

interface Props {
	columns: any;
	filter: (value: string, bool: boolean) => void;
	reset: () => void;
}

const TableHeader: React.FC<Props> = ({
	columns,
	filter,
	reset,
}: Props): JSX.Element => {
	return (
		<thead>
			<tr>
				<th className="nfts__table_number">
					<span>#</span>
				</th>
				{columns.map((column: any, columnIndex: number) => (
					<TableHeaderCell
						key={`table-head-cell-${columnIndex}`}
						column={column}
						filter={filter}
					/>
				))}
				<th className="nfts__table_reset">
					<button onClick={reset}>reset</button>
				</th>
			</tr>
		</thead>
	);
};

export default TableHeader;
