import { IProfileListItem } from './Profile';

export interface ISocialMedia {
	platform: string;
	link: string;
	linkText: string;
}

export interface IUpdateProfile {
	name: string;
	jobTitle: string;
	bio: string;
	countryID: number;
	profileListItems: IProfileListItem[];
	socialMedias: ISocialMedia[];
}
