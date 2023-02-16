export interface IChart {
	genreID: number;
	songs: ISong[];
}

export interface ISong {
	uid: string;
	coverUrl: string;
	artist: {
		firstName: string,
		lastName: string,
		artistName: string,
		slug: string,
	};
	title: string;
	rating: number;
	plays: number;
	countryID: number;
	genreID: number;
	url: string;
	chartPosition: number;
}
