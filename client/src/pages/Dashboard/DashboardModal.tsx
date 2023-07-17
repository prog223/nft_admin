import React from 'react';
import { NftT } from '../../setup/type';

interface Props {
	request: NftT; 
   show: boolean;
   onMailChange: any
}

const DashboardModal: React.FC<Props> = ({ request, show, onMailChange }: Props): JSX.Element => {
	return (
		<>
			<div className="dashboard-modal__desc">
				<img
					src={request.image}
				/>
				<div>
					<h1>{request.name}</h1>
					<p className="dashboard-modal__desc_created">
						Created by {request.creator.username}
					</p>
					<p>{request.description}</p>
				</div>
			</div>
			<div className="dashboard-modal__info">
				<table>
					<thead>
						<tr>
							<th>Price</th>
							<th>Bid</th>
							<th>Category</th>
							<th>Tags</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{request.price}</td>
							<td>{request.bid}</td>
							<td>{request.category}</td>
							<td>
								<ul>
									{request.tags.map((e, i) => (
										<li key={i}>{e}</li>
									))}
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			{show && (
				<div className='dashboard-modal__mail'>
					<h4>
						<span className="material-symbols-outlined">mail</span>
						Mail to {request.admin?.email} why you do not confirm the request
					</h4>
					<textarea placeholder='Message...' onChange={onMailChange}></textarea>
				</div>
			)}
		</>
	);
};

export default DashboardModal;
