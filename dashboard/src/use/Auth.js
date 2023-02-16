import {
	CognitoUserPool,
	AuthenticationDetails,
	CognitoUser,
} from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool({
	UserPoolId: import.meta.env.VITE_USER_POOL_ID,
	ClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
});

let session = null;
const currentUser = userPool.getCurrentUser();
if (currentUser) {
	currentUser.getSession((err, red) => {
		if (err) {
			console.log(err);
			this.signOut();
			return;
		}
		console.log('logged in');
		session = red;
	});
}

export default function useAuth() {
	async function signIn(email, password) {
		const AD = new AuthenticationDetails({
			Username: email.toLowerCase().trim(),
			Password: password,
		});
		const CU = new CognitoUser({
			Username: email.toLowerCase().trim(),
			Pool: userPool,
		});

		return new Promise((resolve, reject) => {
			CU.authenticateUser(AD, {
				onSuccess: function (result) {
					console.log("SURCCESS???")
					resolve(result);
				},
				onFailure: function (err) {
					console.log("ERROR?");
					console.log(err);
					reject(err);
				},
				newPasswordRequired: function (userAttributes, requiredAttributes) {
					// the api doesn't accept this field back
					delete userAttributes.email_verified;

					// store userAttributes on global variable
					// const sessionUserAttributes = userAttributes;
					// CU.completeNewPasswordChallenge('XXX', sessionUserAttributes);
				}
			});
		}).then((res) => {
			session = res;
		});
	}

	function signOut() {
		userPool.getCurrentUser().signOut();
	}

	function isLoggedIn() {
		return userPool.getCurrentUser() ? true : false;
	}

	// Gets the JWT token of the currently signed in user
	function getAuthToken() {
		return session.getIdToken().getJwtToken();
	}

	// Auth headers for authentication with the backend
	function getAuthHeader() {
		return new Headers({
			'Content-Type': 'application/json',
			'Authorization': getAuthToken(),
		});
	}

	return { signIn, signOut, getAuthHeader, isLoggedIn, getAuthToken };
}
