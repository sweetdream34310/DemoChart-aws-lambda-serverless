import { Handler } from 'aws-lambda';
import AWS from 'aws-sdk';
const lambda = new AWS.Lambda();

export const handler: Handler = async (event, context) => {
	console.log(event);

	const paramsAddUser = {
		FunctionName: process.env.addUserToDB as string,
		InvokeArgs: JSON.stringify(event),
	};

	try {
		const temp = await lambda.invokeAsync(paramsAddUser).promise();
		console.log(temp);
		console.log('user added to db');
	} catch (e) {
		console.log(e);
		throw new Error('yikes');
	}

	// Specific Cognito return
	context.succeed(event);
};
