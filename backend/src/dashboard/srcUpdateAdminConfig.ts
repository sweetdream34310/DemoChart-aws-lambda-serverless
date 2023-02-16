import { Handler } from 'aws-lambda';
// DB
import { initDB } from '../shared/db';
import {anInternalError, genericResponse, startupRoutine} from '../shared/helpers';
import {AdminConfigs} from "../shared/models/AdminConfigs";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);


	const body: any = event?.body;
	const { key, value } = body;

	try {
		const entry = await AdminConfigs.findOne({
			where: {
				key
			}
		});

		if(!entry){
			await AdminConfigs.create({
				key,
				value
			})
		} else {
			if (value) {
				await AdminConfigs.update(
					{
						value
					},
					{where: {key: key}}
				);
			} else {
				await AdminConfigs.destroy({
					where: { key: key}
				})
			}
		}

		return genericResponse();
	} catch (e: any) {
		return anInternalError(e);
	}
};
