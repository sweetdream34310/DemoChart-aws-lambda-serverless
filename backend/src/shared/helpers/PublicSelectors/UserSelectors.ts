
export class UserSelectors {

	static profile = [
		'uid',
		'firstName',
		'lastName',
		'artistName',
		'bio',
		'slug',
		'jobTitle',
		'countryID',
		'genreID',
		'createdAt',
		'profileHeaderSrc',
		'profileImageSrc',
		'userType',
	];

	static favorites = [
		'uid',
		'firstName',
		'lastName',
		'artistName',
		'slug',
		'bio',
		'jobTitle',
		'countryID',
		'createdAt',
		'profileImageSrc',
	];

	static songPreview = [
		'slug',
		'firstName',
		'lastName',
		'artistName',
		'countryID',
		'uid'
	]
}