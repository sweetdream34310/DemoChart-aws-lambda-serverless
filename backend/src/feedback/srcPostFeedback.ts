import { Handler } from 'aws-lambda';
import {initDB} from '../shared/db';
import {
	badRequestReturn, genericResponse, startupRoutine
} from '../shared/helpers';
import {SubmitFeedback} from "../../typings/SubmitFeedback";
import {User} from "../shared/models/User";
import {sendMail} from "../shared/mails/mailings";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);

	const uid = event?.cognitoPoolClaims?.sub;
	const body: SubmitFeedback = event?.body;

	try {
		const user = await User.findOne({
			where: { uid: uid },
		});

		if (!user) {
			return badRequestReturn('user not found');
		}

		console.log("sending mail...")

		console.log("HTML");
		console.log(getHtml(body, user));
		console.log("submitting...");

		const resp = await sendMail(
			'juliprop@hotmail.com',
			'[' + body.type + '] from ' + user.name,
			getHtml(body, user)
		)


		console.log(resp);

		return genericResponse(true);
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};

function getHtml(data: SubmitFeedback, user: any): string {
	let checkboxString = '';
	for (let i = 0; i < data.dropdownOptionsChosen.length; i++) {
		checkboxString += `<p>${data.dropdownOptionsChosen[i]}</p>`
	}

	return `
    <h1>Feedback type: ${data.type}</h1>
    
    <h2>Chosen checkboxes:</h2>`
		+ checkboxString +
	`
	<h2>Additional Message:</h2>
    <p>${data.additionalMessage}</p>
    
    <h2>System information</h2>
    <p>${data.systemInformation}</p>
    
    <h1>Sent by:</h1>
    <p>${user.name}</p>
    <p>${user.email}</p>
    <p>${user.userType === 2 ? 'Expert' : 'Artist'}</p>    
  `;
}