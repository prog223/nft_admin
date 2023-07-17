export type LoginT = {
	password: string;
	email: string;
};

export type changeT = {
	current_password: string;
	new_password: string;
	confirm_password: string;
}

export type AdminT = {
	_id: string;
	name: string;
	surname: string;
	email: string;
	isSuper: boolean;
};

export type UserT = {
	username: string;
	_id: string;
};

export type NftT = {
	_id?: string;
	name: string;
	creator: {_id:string, username:string};
	collectionId: string;
	price: number;
	bid: number;
	image: string | undefined;
	category: string;
	description: string;
	tags: Array<string>;
   expirationDate: string;
	admin?: AdminT
};


export type CollectionT = {
	_id?: string;
	name: string;
	creator: string;
	image: string;
	description: string;
};