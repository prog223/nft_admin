import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import useMediaQuery from '../../../setup/hooks/useMeduaQuery';
import useGetAdmin from '../../../setup/hooks/useGetAdmin';
import './style.scss';

interface Props {
	toggle: boolean;
	setToggle: any;
}

const Sidebar: React.FC<Props> = ({
	toggle,
	setToggle,
}: Props): JSX.Element => {
	const [dropDown, setDropDown] = useState<boolean>(false);
	const [dropDownCollection, setDropDownCollection] = useState<boolean>(false);
	const mobile = useMediaQuery('(max-width: 576px)');
	const user = useGetAdmin();

	useEffect(() => {
		if (mobile) {
			setToggle(false);
		}
	}, [mobile]);

	return (
		<div className={classNames('sidebar', { active: toggle })}>
			<div className='sidebar_wrapper'>
				{!mobile && (
					<button
						className={classNames("sidebar__toggle-btn", {'sidebar__toggle-btn_open': toggle})}
						onClick={() => {
							setToggle(!toggle);
						}}
					>
						<span className="material-symbols-outlined">
							arrow_forward_ios
						</span>
					</button>
				)}

				<div className={classNames('opacity', { opacity_active: toggle })}>
					<div
						className={classNames('sidebar__header opacity', {
							header_opacity: !toggle,
						})}
					>
						<div>
							NFT Admin{' '}
							{user?.isSuper && (
								<span className="sidebar__header__span">super</span>
							)}
						</div>
					</div>
					<div className="sidebar__navigation">
						<ul>
							<li>
								<Link to={'/admin/dashboard'}>
									<span className="material-symbols-outlined">
										dashboard
									</span>
									<p
										className={classNames('sidebar__header opacity', {
											header_opacity: !toggle,
										})}
									>
										Dashboard
									</p>
								</Link>
							</li>
							<li>
								<Link to={'/admin/users'}>
									<span className="material-symbols-outlined">
										group
									</span>
									<p
										className={classNames('sidebar__header opacity', {
											header_opacity: !toggle,
										})}
									>
										Users
									</p>
								</Link>
							</li>
							<li className="dropdown_link">
								<div onClick={() => setDropDown(!dropDown)}>
									<span className="material-symbols-outlined">
										rocket_launch
									</span>
									<p
										className={classNames('sidebar__header opacity', {
											header_opacity: !toggle,
										})}
									>
										Nfts
										{dropDown ? (
											<span className="material-symbols-outlined">
												expand_less
											</span>
										) : (
											<span className="material-symbols-outlined">
												expand_more
											</span>
										)}
									</p>
								</div>
								<ul
									className={classNames(
										'drop_down',
										{ drop_down_active: dropDown },
										{ drop_down_mobile: !toggle }
									)}
								>
									<li>
										<Link
											to={'/admin/create_nft'}
											onClick={() => setDropDown(false)}
										>
											Create
										</Link>
									</li>
									<li>
										<Link
											to={'/admin/nfts'}
											onClick={() => setDropDown(false)}
										>
											See
										</Link>
									</li>
								</ul>
							</li>
							<li className="dropdown_link">
								<div
									onClick={() =>
										setDropDownCollection(!dropDownCollection)
									}
								>
									<span className="material-symbols-outlined">
										library_books
									</span>
									<p
										className={classNames('sidebar__header opacity', {
											header_opacity: !toggle,
										})}
									>
										Collections
										{dropDownCollection ? (
											<span className="material-symbols-outlined">
												expand_less
											</span>
										) : (
											<span className="material-symbols-outlined">
												expand_more
											</span>
										)}
									</p>
								</div>
								<ul
									className={classNames(
										'drop_down',
										{ drop_down_active: dropDownCollection },
										{ drop_down_mobile: !toggle }
									)}
								>
									<li>
										<Link
											to={'/admin/create_collection'}
											onClick={() => setDropDownCollection(false)}
										>
											Create
										</Link>
									</li>
									<li>
										<Link
											to={'/admin/collections'}
											onClick={() => setDropDownCollection(false)}
										>
											See
										</Link>
									</li>
								</ul>
							</li>
							<li>
								<Link to={'/admin/home_settings'}>
									<span className="material-symbols-outlined">
										settings_applications
									</span>
									<p
										className={classNames('sidebar__header opacity', {
											header_opacity: !toggle,
										})}
									>
										Home Settings
									</p>
								</Link>
							</li>
							<li>
								<Link to={'/admin/chat'}>
									<span className="material-symbols-outlined">
										forum
									</span>
									<p
										className={classNames('sidebar__header opacity', {
											header_opacity: !toggle,
										})}
									>
										Chat
									</p>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
