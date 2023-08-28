import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = (perPage = 6, defaultPage = 1) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 1
	const itemsPerPage = Number(searchParams.get('count')) || 6

	const updatePage = (newPage: number) => {
		searchParams.set('page', newPage.toString());
		setSearchParams(searchParams);
	};

	const updatePerPage = (count: number) => {
		
		searchParams.set('count', count.toString());
		setSearchParams(searchParams);
	};

	return {
		currentPage,
		itemsPerPage,
		updatePage,
		updatePerPage,
	};
};

export default usePagination;



