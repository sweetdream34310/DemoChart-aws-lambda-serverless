import { Handler } from 'aws-lambda';
import { startupRoutine } from '../shared/helpers';
import { LANDING_PAGE_URL } from '../shared/config';
import confirmationMail from './html mail templates/confirmationMail';
import resetPasswordMail from './html mail templates/resetPasswordMail';

import { User } from '../shared/models/User';
import {initDB} from "../shared/db";
initDB();


export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);

	console.log("EVENT", event);

	if (event.triggerSource === 'CustomMessage_SignUp') {
		event.response.emailMessage = confirmationMail(event, {
			firstName: event.request.clientMetadata.firstName,
			userType: event.request.clientMetadata.userType,
			origin: event.request.clientMetadata.origin
		});
		event.response.emailSubject = 'Verify Your Democharts Account';
	} else if (event.triggerSource === 'CustomMessage_ResendCode') {

		const email = event.request.userAttributes.email;
		const user = await User.findOne({ where: { email } });
		event.response.emailMessage = confirmationMail(event, {
			firstName: user?.firstName,
			userType: user?.userType
		});

		console.log("confirmation mail...");
		console.log(event.response.emailMessage);
		event.response.emailSubject = 'Verify Your Democharts Account';
	} else if (event.triggerSource === 'CustomMessage_ForgotPassword') {
		event.response.emailMessage = resetPasswordMail(event);
		event.response.emailSubject = 'Reset your password';

	}

	callback(null, event);
};



// import { Handler } from 'aws-lambda';
// import { startupRoutine } from '../shared/helpers';
// import { LANDING_PAGE_URL } from '../shared/config';
// import { confirmAccountTemplate } from "../shared/mails/sendConfirmAccount";
//
// export const handler: Handler = async (event, context) => {
// 	startupRoutine(event);
//
// 	const email = confirmAccountTemplate({firstName: event.userName});
//
// 	console.log(event);
// 	console.log(email);
//
// 	event.response.emailMessage = email;
// 	event.response.emailSubject = 'Verify Your Democharts Account';
//
// 	context.succeed(event);
// };
