export interface UserType {
	id: number;
	name: string;
}

export enum UserTypes {
	Undefined = 0,
	Artist = 1,
	Expert = 2,
}

export const USER_TYPES: UserType[] = [
	{
		id: 1,
		name: 'Artist',
	},
	{
		id: 2,
		name: 'Expert',
	},
];
