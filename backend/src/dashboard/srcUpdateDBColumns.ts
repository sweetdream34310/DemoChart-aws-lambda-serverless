import { Handler } from 'aws-lambda';
import {
	anInternalError,
	badRequestReturn,
	genericResponse,
	startupRoutine,
} from '../shared/helpers';
import { COUNTRIES } from '../../../lib/types/Countries';
import { GENRES } from '../../../lib/types/Genres';
import { MOODS } from '../../../lib/types/Moods';
import { STAGE } from '../shared/config';
import { Country } from '../shared/models/Country';
import { Genre } from '../shared/models/Genre';
import { User } from '../shared/models/User';
import { Song } from '../shared/models/Song';
import { ProfileListItem } from '../shared/models/ProfileListItem';
import { Mood } from '../shared/models/Mood';
import { initDB, sequelize } from '../shared/db';
import {createExpert} from "../misc/mock-test-data/createExpert";
import {createArtist} from "../misc/mock-test-data/createArtist";
import {createSongs} from "../misc/mock-test-data/createSong";
import {HasMany} from "sequelize-typescript";
import {SocialMedia} from "../shared/models/SocialMedia";
import {Rating} from "../shared/models/Rating";
import generateUniqueSlug from "../shared/helpers/generateUniqueSlug";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	try {
		// if (STAGE !== 'dev') return badRequestReturn();

		await sequelize.sync({ alter: true });

		const users = await User.findAll({});

		const promises = [] as any;

		// TODO do not remove this, we'll need this for the deploy
		// for (let i = 0; i < users.length; i++) {
		// 	const name = users[i].name;
		//
		// 	const first = name.substr(0,name.indexOf(' '));
		// 	const last = name.substr(name.indexOf(' ')+1);
		//
		// 	const slug = await generateUniqueSlug(first, last, undefined);
		// 	console.log("slug: " + slug)
		//
		// 	const updateUser = users[i].update({
		// 		firstName: first,
		// 		lastName: last,
		// 		slug: slug,
		// 	});
		// 	await updateUser;
		// 	// promises.push(updateUser);
		// }
		// await Promise.all(promises);

		return genericResponse(true);
	} catch (err: any) {
		return anInternalError(err);
	}
};
