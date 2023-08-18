import React from 'react';
import classNames from 'classnames';

interface Props {
	item: any;
	column: any;
}

const TableRowCell: React.FC<Props> = ({
	item,
	column,
}: Props): JSX.Element => {
	return (
		<td>
			<div className="tr-cell">
				{column.key === 'username' && item.avatar && (
					<div>
						<img src={item.avatar}></img>
					</div>
				)}

				{column.key === 'verified' && (
					<>
						{item.verified ? (
							<p style={{ color: '#7551FF' }}>verified</p>
						) : (
							<p className="red">not verified</p>
						)}
					</>
				)}

				{column.render
					? column.render(column, item)
					: item[column.key]?._id
					? item[column.key].name || item[column.key].username
					: item[column.key]}
			</div>
			{(column.key === 'total_sales' || column.key === 'price') && ' ETH'}
		</td>
	);
};

export default TableRowCell;
