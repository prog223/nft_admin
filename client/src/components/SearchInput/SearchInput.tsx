import React, { useState, useCallback } from 'react';
import Input from '../Input/Input';
import classNames from 'classnames';
import { debounce } from '../../setup/utils';
import './style.scss';

interface Props {
	options: any;
	name: string;
	field: string;
	fetch: (search: string) => void;
	onHandleChange?: any
}

const SearchInput: React.FC<Props> = ({
	options,
	name,
	field,
	fetch,
	onHandleChange
}: Props): JSX.Element => {
	const [selectedOption, setSelectedOption] = useState('');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		fetch(e.target.value);
	};

	const optimizedFn = useCallback(debounce(handleSearch), []);

	const handleOptionSelect = (option: string) => {
		setSelectedOption(option);
		if(onHandleChange){
			onHandleChange(option)	
		}
	};

	return (
		<div className="search-input">
			<select
				className="search-input_select"
				name={name}
				value={selectedOption}
				onChange={(e:any) => handleOptionSelect(e.target.value)}
			>
				<option value="" disabled>Select {name}</option>
				{options?.map((option: any) => (
					<option
						key={option._id}
						value={option._id}
					>
						{option[field]}
					</option>
				))}
			</select>
			<input
				className="search-input_input"
				type="text"
				placeholder="Search..."
				onChange={optimizedFn}
			/>
		</div>
	);
};

export default SearchInput;
