import { Handler } from 'aws-lambda';

// DB
import { initDB } from '../shared/db';
initDB();

// Models
import {startupRoutine, badRequestReturn, genericResponse, anInternalError} from '../shared/helpers';
import {FavoriteArtist} from "../../typings/FavoriteArtist";
import {Favorites} from "../shared/models/Favorites";

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;
	const body: FavoriteArtist = event?.body;

	console.log("EVENT BODY:");
	console.log(event?.body);

	const {
		artistID,
		added
	} = body;

	try {
		const subscription = await Favorites.findOne({
			where: { followerUid: uid, followedUid: artistID },
		});

		if (added && !subscription) {
			await Favorites.create({
				followerUid: uid,
				followedUid: artistID
			});

			return genericResponse(true);

		} else if(!added && subscription) {
			await Favorites.destroy({
				where: {
					followerUid: uid,
					followedUid: artistID,
				},
			});

			return genericResponse(true);
		} else {
			const msg = 'User tried to add/remove an artist from a subscription but with errors: follower user id: ' + uid + ' artistID: ' + artistID + ' added: ' + added;
			console.error(msg);
			return badRequestReturn(msg);
		}

	} catch(e) {
		console.error(e);
		return anInternalError();
	}
};
