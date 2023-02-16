export interface IDemoplayerDemo {
	uid: string;
	coverSrc: string;
	mp3Src: string;
	title: string;
	genreID: number;
	artist: {
		uid: string;
		firstName: string;
		lastName: string;
		slug: string;
		artistName: string;
		isFollowedByRequestedUser: boolean;
	};
	userUid: string;
	countryID: number;
}
