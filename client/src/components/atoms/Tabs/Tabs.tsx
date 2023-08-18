import React from 'react';
import { TabT } from '../../../setup/type';
import classNames from 'classnames';
import './style.scss'

interface Props {
	selectedId: number;
	handleClick: Function;
	tabs: TabT[];
}

const Tabs: React.FC<Props> = ({ selectedId, handleClick, tabs }: Props) => {
	return (
		<div className="tabs">
			{tabs.map((tab: TabT) => {
				return (
					<div
						key={tab.id}
						onClick={()=>handleClick(tab.id)}
						className={classNames('tabs_item', {
							tabs_active: selectedId === tab.id,
						})}
					>
						{tab.title}
					</div>
				);
			})}
		</div>
	);
};

export default Tabs;
