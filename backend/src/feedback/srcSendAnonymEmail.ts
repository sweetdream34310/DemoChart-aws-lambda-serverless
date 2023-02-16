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

	const body = event?.body;

	try {
		console.log("sending mail...")

		console.log("HTML");
		console.log(getHtml(body));
		console.log("submitting...");

		const resp = await sendMail(
			'hello@democharts.org',
			body.subject ? body.subject : '[' + body.type + '] received',
			getHtml(body)
		)


		console.log(resp);

		return genericResponse(true);
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};

function getHtml(data: any): string {
	return `
    <h1>Type: ${data.type}</h1>
    
    <p>
	<pre>
	${data.content}
	</pre>
	</p>
  `;
}