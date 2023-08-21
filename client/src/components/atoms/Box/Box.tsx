import React from 'react';
import classNames from 'classnames';
import './style.scss';
import { UserT } from '../../../setup/type';
import User from '../User/User';	

interface Props {
	variant?: 'default' | 'icon';
	size?: 'sm' | 'bg';
	img?: string;
	title?: string;
	user?: UserT;
	icon?: React.ReactNode;
	price?: number;
	bid?: number		
	color?: 'dark_box' | 'light_box';
	onClick?: any;
}

const Box: React.FC<Props> = ({
	variant,
	img,
	title,
	user,
	icon,
	price,
	bid,
	size,
	color,
	onClick,
}): JSX.Element => {
	const style = classNames(
		'box wh',
		size ?? 'sm',
		variant ?? 'default',
		color ?? 'light_box'
	);

	return (
		<div
			className={style}
			onClick={onClick}
		>
			<div className="box__img">
				{icon && <div className="box__img__icon">{icon}</div>}
				<img src={img} />
			</div>
			<div className="box__inf">
				<div className="flex">
					<p className="box__inf__title">{title}</p>
					{user && (
						<User	 user={user}/>
					)}
				</div>

				{price && bid && (
					<div className="box__inf__price">
						<div className="box__inf__price__item">
							<p>Price</p>
							<p>{price} ETH</p>
						</div>
						<div className="box__inf__price__item">
							<p>Highest Bid</p>
							<p>{bid} wETH</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Box;
