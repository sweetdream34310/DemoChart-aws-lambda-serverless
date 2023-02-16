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
import { CATEGORIES } from '../../../lib/types/Categories';
import { Category } from '../shared/models/Category';
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	try {
		if (STAGE !== 'dev') return badRequestReturn();

		await Category.bulkCreate(CATEGORIES)

		// await sequelize.sync({ force: true });

		// // if (false) return;

		// // IMPORT COUNTRY DATA
		// await Country.bulkCreate(COUNTRIES);

		// // IMPORT GENRE DATA
		// await Genre.bulkCreate(GENRES);

		// // IMPORT MOOD DATA
		// await Mood.bulkCreate(MOODS);

		// // SAMPLE USERS


		// console.log("Step 1");
		// const artist1 = await createArtist('yannic.wlns@gmail.com', 'e36343ab-61fa-4142-a759-ee579eacd1b4', 'Max');
		// console.log("Step 2");
		// const artist2 = await createArtist('artist+2@democharts.org', 'Geo Popoff');
		// console.log("Step 3");
		// const artist3 = await createArtist('artist+3@democharts.org', 'Bildertuch');


		// console.log("Step 4");

		// const expert1 = await createExpert('yannic.ellhotk@gmail.com', 'ca56e3c2-1144-4436-9449-24b19b9088b3');
		// const expert2 = await createExpert('expert+2@democharts.org');
		// const expert3 = await createExpert('expert+3@democharts.org');

		// console.log("Step 5");

		// await createSongs(artist1.uid, expert1.uid);

		return genericResponse(true);
	} catch (err: any) {
		return anInternalError(err);
	}
};
