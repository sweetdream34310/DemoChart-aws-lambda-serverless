import { Handler } from 'aws-lambda';
import { SignupMetadata } from '../../../lib/types/SignupMetadata';
// DB
import { initDB } from '../shared/db';
import {anInternalErrorResponse, badRequestReturn} from '../shared/helpers';
// Models
import { User } from '../shared/models/User';
import {UserTypes} from "../../../lib/types/UserTypes";
import generateUniqueSlug from "../shared/helpers/generateUniqueSlug";

initDB();


export const handler: Handler = async (event, callback, context) => {
	console.log("event", event);
	console.log("clientmetadata", event);

	const metadata: SignupMetadata = event?.request?.clientMetadata;
	const {
		userType,
		firstName,
		lastName,
		genreID,
		countryID,
		name: companyName,
		industryID,
		newsletter,
		applicationSocialProfileName,
		applicationSocialProfilePlatform,
		applicationMusicProfileName,
		applicationMusicProfilePlatform,
	} = metadata;
	const uid = event.userName;
	const { email } = event.request.userAttributes;

	try {
		const preSlug = userType?.toString() === '1' ? companyName : (firstName + '' + lastName);
		const generatedSlug = await generateUniqueSlug(preSlug, async (slug: string) => await User.findOne({where: {slug}}));

		const attributes = {
			uid,
			email,
			firstName,
			lastName,
			userType,
			companyName,
			genreID,
			countryID,
			industryID,
			company: '',
			artistName: '',
			jobTitle: '',
			bio: '',
			newsletter: newsletter,
			applicationSocialProfileName,
			applicationSocialProfilePlatform,
			applicationMusicProfileName,
			applicationMusicProfilePlatform,
			approvedByAdmin: false,
			slug: generatedSlug,
			credits: userType?.toString() === '1' ? 3 : 0
		};

		if (userType === 1 || userType?.toString() === '1') {
			attributes.genreID = genreID;
			attributes.artistName = companyName;
			attributes.approvedByAdmin = false;
		} else {
			attributes.industryID = industryID;
			attributes.company = companyName;
			attributes.approvedByAdmin = false;
		}
		await User.create(attributes);

		return true;
	} catch (e) {
		return anInternalErrorResponse(callback, e);
	}
};
