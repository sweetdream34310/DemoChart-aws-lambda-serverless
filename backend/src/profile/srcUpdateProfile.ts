import { Handler } from 'aws-lambda';
import { UpdateProfile } from 'typings/UpdateProfile';
// DB
import { initDB } from '../shared/db';
// Models
import {
  badRequestReturn,
  genericResponse,
  startupRoutine
} from '../shared/helpers';
import { ProfileListItem } from '../shared/models/ProfileListItem';
import { SocialMedia } from '../shared/models/SocialMedia';
import { User } from '../shared/models/User';

initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;
	const body: UpdateProfile = event?.body;
	const {
		firstName,
		lastName,
		artistName,
		jobTitle,
		bio,
		countryID,
		profileListItems,
		socialMedias,
		genreID,
	} = body;

	try {
		await User.update(
			{
				firstName,
				lastName,
				artistName,
				jobTitle,
				bio,
				genreID,
				countryID,
			},
			{ where: { uid } }
		);

		// Update profile list items
		await ProfileListItem.destroy({
			where: {
				userUid: uid,
			},
		});

		await ProfileListItem.bulkCreate(
			profileListItems.map((e) => ({ ...e, ...{ userUid: uid } }))
		);

		// Update social medias
		await SocialMedia.destroy({
			where: {
				userUid: uid,
			},
		});

		await SocialMedia.bulkCreate(
			socialMedias.map((e) => ({ ...e, ...{ userUid: uid } }))
		);

		return genericResponse(true);
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
