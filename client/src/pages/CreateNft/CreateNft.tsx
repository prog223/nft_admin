import React, { useCallback, useState, useEffect, useRef } from 'react';
import Input from '../../components/atoms/Input/Input';
import Textarea from '../../components/atoms/Textarea/Textarea';
import Button from '../../components/atoms/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getUsers } from '../../redux/User/userService';
import { selectUsers } from '../../redux/User/userSlice';
import { getCollections } from '../../redux/Collection/collectionService';
import { selectCollections } from '../../redux/Collection/collectionSlice';
import './style.scss';
import SearchInput from '../../components/atoms/SearchInput/SearchInput';
import useTomorrowDate from '../../setup/hooks/useTomorrowDate';
import { createNft } from '../../redux/Nft/nftService';

const CreateNft: React.FC = (): JSX.Element => {
	const [tags, setTags] = useState<Array<string>>([]);
	const [tag, setTag] = useState<string>('');
	const [file, setFile] = useState<string>('');
	const tomorrow = useTomorrowDate().toISOString().split('T')[0];

	const dispatch = useDispatch<AppDispatch>();

	const { data, isLoading } = useSelector(selectUsers);
	const collections = useSelector(selectCollections);

	const fetchUsers = (search: string = '') => {
		dispatch(getUsers({ search }));
	};

	const fetchCollections = (search: string = '') => {
		dispatch(getCollections({ search }));
	};

	useEffect(() => {
		fetchUsers();
		fetchCollections();
	}, []);

	const addTag = () => {
		if (tag) {
			setTags([...tags, tag]);
			setTag('');
		}
	};

	const onFileChange = (e: any) => {
		const file = e.target.files[0];
		if (file) setFileToBase(file);
	};

	const setFileToBase = (file: File) => {
		const reader: any = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setFile(reader.result);
		};
	};

	const categories = [
		'Art',
		'Collectibles',
		'Music',
		'Photography',
		'Video',
		'Utility',
		'Sport',
		'Virtual Worlds',
	];

	const deleteTag = (ind: number) => {
		tags.splice(ind, 1);
		setTags([...tags]);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formElement = e.target as HTMLFormElement;
		const isValid = formElement.checkValidity();
		const firstInvalidField = formElement.querySelector(
			':invalid'
		) as HTMLInputElement;

		if (!tags.length) formElement.tags.focus();
		firstInvalidField?.focus();
		
		if (isValid && tags.length) {
			dispatch(
				createNft({
					name: formElement.nft.value,
					creator: formElement.creator.value,
					price: formElement.price.value,
					bid: formElement.bid.value,
					description: formElement.description.value,
					image: file,
					category: formElement.category.value,
					expirationDate: formElement.expirationDate.value,
					collectionId: formElement.collection.value,
					tags
				})
			);
		}
	};

	return (
		<div className="create_nft">
			<div>
				<h1>Create NFT</h1>
			</div>
			<div className="create_nft__form">
				<form
					onSubmit={handleSubmit}
					noValidate
				>
					<SearchInput
						name="creator"
						options={data?.users}
						field="username"
						fetch={fetchUsers}
					/>
					<SearchInput
						name="collection"
						options={collections?.data?.collections}
						field="name"
						fetch={fetchCollections}
					/>
					<div className="create_nft__form__section">
						<div className="image_inp">
							<span className="material-symbols-outlined">
								upload_file
							</span>
							{file && (
								<img
									className="image_inp__image"
									src={file}
								/>
							)}
							<input
								type="file"
								onChange={(e) => onFileChange(e)}
							/>
						</div>
						<div className="create_nft__form__section_group">
							<Input
								name="nft"
								placeholder="Name"
								size="small"
								required
							/>
							<div className="textarea-wrapper">
								<Textarea
									name="description"
									placeholder="Description"
									size="small"
									required
								/>
							</div>
						</div>
					</div>

					<div className="create_nft__form__section_group">
						<Input
							label="Expiration Date"
							type="date"
							name="expirationDate"
							size="small"
							defaultValue={tomorrow}
							min={tomorrow}
							required
						/>
						<select
							name="category"
							id=""
							className="create_nft__form__select"
						>
							<option
								value=""
								disabled
								// selected
								defaultChecked
							>
								Category
							</option>
							{categories.map((e, i) => {
								return (
									<option
										value="e"
										key={i}
									>
										{e}
									</option>
								);
							})}
						</select>
					</div>
					<div className="create_nft__form__section">
						<Input
							type="number"
							name="price"
							placeholder="Price"
							size="small"
							required
							min="0"
						/>
						<Input
							type="number"
							name="bid"
							placeholder="Bid"
							size="small"
							required
							min="0"
						/>
					</div>
					<div className="tag_input">
						<div className="tag_input__inp">
							<input
								name="tags"
								value={tag}
								type="text"
								onChange={(e: any) => setTag(e.target.value)}
								placeholder="Tag"
							/>
							<button
								type="button"
								onClick={addTag}
							>
								Add
							</button>
						</div>
						<div className="tag_input__tags">
							{tags.map((e: string, i: number) => {
								return (
									<div
										key={i}
										className="tag_input__tags__tag"
									>
										{e}{' '}
										<span
											onClick={() => deleteTag(i)}
											className="tag_input__tags__tag__close"
										>
											x
										</span>
									</div>
								);
							})}
						</div>
					</div>

					<div className="create_nft__form__section">
						<Button size="small">Save</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateNft;
