import React from 'react';
import classNames from 'classnames';
import './style.scss'

interface Props {
	user: any;
	variant?: 'bold'
}

const User: React.FC<Props> = ({ user, variant }: Props): JSX.Element => {
	return (
		<div className={classNames("inf__user", variant && 'inf__user__bold')}>
			<span>
				{user?.avatar ? (
					<>
						<img src={user.avatar} />
					</>
				) : (
					<>
						<img src={require('../../../assets/images/Avatar.png')} />
					</>
				)}
			</span>
			<p>{user?.username}</p>
		</div>
	);
};

export default User;
