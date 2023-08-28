import React, { useEffect, useState } from 'react';
import SearchInput from '../../components/atoms/SearchInput/SearchInput';
import Input from '../../components/atoms/Input/Input';
import Textarea from '../../components/atoms/Textarea/Textarea';
import Button from '../../components/atoms/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../redux/User/userSlice';
import { getUsers } from '../../redux/User/userService';
import { AppDispatch } from '../../redux/store';
import { createCollection } from '../../redux/Collection/collectionService';
import Loading from '../../components/atoms/Loading/Loading';
import { selectCollections } from '../../redux/Collection/collectionSlice';

const CreateCollection: React.FC = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const { data } = useSelector(selectUsers);
	const { isLoading } = useSelector(selectCollections);
	const [file, setFile] = useState<string>('');
	const fetchUsers = (search: string = '') => {
		dispatch(getUsers({ search }));
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

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formElement = e.target as HTMLFormElement;
		const isValid = formElement.checkValidity();
		const firstInvalidField = formElement.querySelector(
			':invalid'
		) as HTMLInputElement;

		firstInvalidField?.focus();

		if (isValid) {
			dispatch(
				createCollection({
					name: formElement.nft.value,
					creator: formElement.creator.value,
					description: formElement.description.value,
					image: file,
				})
			);

			formElement.reset();
			setFile('')
		}
	};
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div>
					<h1>Create Collection</h1>
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

							<div className="create_nft__form__section">
								<Button size="small">Save</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default CreateCollection;
