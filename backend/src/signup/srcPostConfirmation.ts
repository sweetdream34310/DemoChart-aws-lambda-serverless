import { Handler } from 'aws-lambda';
import {User} from "../shared/models/User";
import {anInternalErrorResponse, genericResponse} from "../shared/helpers";
import {initDB} from "../shared/db";
import axios from "axios";
import {COUNTRIES} from "../../../lib/types/Countries";
import {GENRES} from "../../../lib/types/Genres";
import {INDUSTRIES} from "../../../lib/types/Industries";

initDB()

export const handler: Handler = async (event, context, callback) => {
	console.log("EVENT HELP", event);


	try {

		const email = event.request.userAttributes.email;

		console.log("before user find");
		const user = await User.findOne(
			{ where: { email } }
		);

		console.log("after user find");
		if (!user) {
			return anInternalErrorResponse(callback, 'Could not find user in database.')
		}

		if (!user.newsletter) {
			console.log("New user " + user.email + " did not subscribe to newsletter")
			return genericResponse(true);
		}



		const apiKey = 'e2350f47a2da283d5d2dadaaf7ae0a5ee277507743f44493a047311f1d73dedc3054814a';

		const axios = require('axios');

		const instance = axios.create({
			baseURL: 'https://democharts.api-us1.com/',
			timeout: 30000,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Api-Token': apiKey,
				'Host': 'democharts.api-us1.com',
			}
		});


		const countryObj = COUNTRIES.find(el => el.countryCode === user.countryID )
		const country = countryObj && countryObj.name;

		const genresObj = GENRES.find(el => el.id === user.genreID )
		const genre = genresObj && genresObj.name;

		const industryObj = INDUSTRIES.find(el => el.id === user.industryID )
		const industry = industryObj && industryObj.name;



		// Get the id's of the custom fields: https://democharts.api-us1.com/api/3/fields
		const res = await instance.post('/api/3/contacts', {
			"contact": {
				"email": user.email,
				"firstName": user.firstName,
				"lastName": user.lastName,
				"fieldValues": [
					{field: '4', value: user.userType === 2 ? 'expert' : 'artist'},
					{field: '5', value: ''+country},
					{field: '6', value: ''+genre},
					{field: '7', value: ''+industry}
				]
			}
		})


		console.log("Contact added", res.data)
		console.log("Field values", res.data.fieldValues)

		const ARTIST_LIST = 3;
		const EXPERT_LIST = 2;

		const addToListId = user.userType === 2 ? EXPERT_LIST : ARTIST_LIST;

		await instance.post ('/api/3/contactLists', {
			contactList: {
				list: addToListId,
				contact: res.data.contact.id,
				status: 1 // 1 means active, 2 means inactive
			}
		})



		return genericResponse(true)

	} catch (e) {
		console.log(e);
		throw new Error('Add to Active Campaign failed');
	}


	// Specific Cognito return
	callback(null, event)
};
