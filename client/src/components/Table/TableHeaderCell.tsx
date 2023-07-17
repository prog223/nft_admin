import React, { useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as Arrow } from '../../assets/images/ArrowRight.svg';

interface Props {
	column: any;
	filter: (value: string, bool: boolean) => void;
}

const TableHeaderCell: React.FC<Props> = ({
	column,
	filter
}): JSX.Element => {
	const [toggle, setToggle] = useState<boolean>(false);
	return (
		<th>
			<div>
				{column.title.replace('_'," ")}
				<button
					onClick={() => {
						filter(column.key, toggle);
						setToggle(!toggle);
					}}
					className={classNames('thead-btn', { dec: toggle })}
				>
					<Arrow />
				</button>
			</div>
		</th>
	);
};

export default TableHeaderCell;
