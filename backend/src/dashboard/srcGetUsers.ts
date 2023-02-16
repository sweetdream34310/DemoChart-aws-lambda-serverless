import { Handler } from 'aws-lambda';
// DB
import { initDB } from '../shared/db';
import {anInternalErrorResponse, startupRoutine} from '../shared/helpers';
import { User } from '../shared/models/User';
import {UserSelectors} from "../shared/helpers/PublicSelectors/UserSelectors";
import {Rating} from "../shared/models/Rating";
import {Listen} from "../shared/models/Listen";
import {Seller} from "../shared/models/Seller";

initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);

	const { page } = event.body;

	const offset = 500 * Number.parseInt(page || 0);

	try {
		const result = await User.findAll({
			order: [['createdAt', 'DESC']],
			limit: 500,
			offset: offset,
			include: [
				{ model: Seller },
			],
		});

		const totalResult = await User.count();
		const totalResultNewsletter = await User.count({ where: { newsletter: true}});

		return {
			result,
			totalResult,
			totalResultNewsletter
		};
	} catch (e: any) {
		return anInternalErrorResponse(callback, 'error fetching users')
	}
};
