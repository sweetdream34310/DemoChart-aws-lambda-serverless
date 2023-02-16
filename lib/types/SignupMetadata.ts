export interface SignupMetadata {
	userType: number;
	// Artist / Manager name
	name: string;
	firstName: string;
	lastName: string;
	countryID: number;
	industryID: number;
	genreID: number;

	newsletter: boolean,
	applicationSocialProfileName: string,
	applicationSocialProfilePlatform: string,
	applicationMusicProfileName: string,
	applicationMusicProfilePlatform: string,
}
