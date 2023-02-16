export interface IProfileListItem {
	type: string;
	title: string;
	header: string;
	description: string;
	dateString?: string;
	link?: string;
}

export interface uploadedSong {
	uid: string;
	title: string;
	genreID: number;
	url: string;
	coverUrl?: string;
	playing?: boolean;
}

export interface IProfile {
	uid: string;
	profileImg: string;
	profileHeader: string;
	profileHeaderSrc: string;
	profileImageSrc: string;
	name: string; // Getting deprecated!
	slug: string;
	firstName: string;
	lastName: string;
	artistName: string;
	bio?: string;
	jobTitle?: string;
	genreID?: number;
	countryID: number;
	userType: number;
	createdAt: string;
	socialMedias: {
		platform: string;
		link: string;
		linkText: string;
	}[];
	uploadedSongs: uploadedSong[];
	profileListItems: IProfileListItem[];
	isFollowedByRequestedUser: boolean;
}
