import { UserTypes } from '../types/UserTypes';

export interface UserDto {
	uid: string;
	email: string;
	name: string;
	userType: UserTypes;
	industryID: number;
	genreID: number;
	countryID: number;
	createdAt: string;
	updatedAt: string;
}
