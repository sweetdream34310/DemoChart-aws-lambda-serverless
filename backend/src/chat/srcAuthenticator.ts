import { Handler } from 'aws-lambda';
import { startupRoutine } from '../shared/helpers';
import jose from 'jose';
import fetch from 'node-fetch';

const cognitoPoolId = process.env.USERPOOL_ID;
const cognitoIssuer = `https://cognito-idp.eu-central-1.amazonaws.com/${cognitoPoolId}`;

export const handler: Handler = async (event, context) => {
	startupRoutine(event);

	// Read input parameters from event
	const token = event.queryStringParameters.Authorizer;
	const methodArn = event.methodArn;

	if (!token) {
		throw new Error('Unauthorized');
	} else {
		// Get the kid from the headers prior to verification
		// const sections = token.split('.');
		const decode = jose.JWT.decode(token, {
			complete: true,
		}) as any;
		const kid = decode.header.kid;

		// Fetch known valid keys
		const response = await fetch(
			`${cognitoIssuer}/.well-known/jwks.json`
		).then((e) => e.json());

		const keys = response['keys'];
		const foundKey = keys.find((key: any) => key.kid === kid);

		if (!foundKey) {
			throw new Error('Public key not found in jwks.json');
		} else {
			try {
				const result = await jose.JWK.asKey(foundKey);
				const claims = jose.JWT.verify(token, result) as any;

				// Verify the token expiration
				const currentTime = Math.floor((new Date() as any) / 1000);
				if (currentTime > claims.exp) {
					throw new Error('Token expired!');
				} else if (claims.aud !== process.env.USERPOOL_CLIENT_ID) {
					throw new Error('Token was not issued for target audience');
				} else {
					console.log('success');
					return generateAllow(claims.sub, methodArn);
				}
			} catch (error) {
				throw new Error(`Unable to verify token ${error}`);
			}
		}
	}
};

function generateAllow(uid: string, methodArn: string) {
	return {
		context: {
			uid,
		},
		principalId: 'me',
		policyDocument: {
			Version: '2012-10-17',
			Statement: [
				{
					Action: 'execute-api:Invoke',
					Effect: 'Allow',
					Resource: methodArn,
				},
			],
		},
	};
}
