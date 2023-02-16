import {ClientMetadata} from "amazon-cognito-identity-js";

// COGNITO STUFF
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
	CognitoUserSession,
} from 'amazon-cognito-identity-js';

interface UserMetaData extends ClientMetadata {
	firstName: string,
	lastName: string,
	userType?: string,
	name?: string,
	countryID?: string,
	industryID?: string,
	genreID?: string,
	newsletter?: string,
	applicationSocialProfileName?: string,
	applicationSocialProfilePlatform?: string,
	applicationMusicProfileName?: string,
	applicationMusicProfilePlatform?: string,
}

export const RegisterMixin = {
	data() {
		return {
			userPool: undefined
		}
	},

	beforeMount() {
		this.userPool = new CognitoUserPool({
			UserPoolId: this.$config.UserPoolId,
			ClientId: this.$config.ClientId,
		});
	},
	methods: {
		/**
		 * Prerequires an valid email
		 * @return true if it it's free, false otherwise
		 */
		async __checkIfEmailIsFree(email) {
			const res = await this.$axios.post(`/signup/userExists`, { mail: email });
			return !res.data.exists
		},

		/**
		 * Signup a user - This method also triggers a verification email on backend side.
		 * @param email - provided by user
		 * @param password - provided by user
		 * @param userMetaData - provided by user
		 * @param callback - (err, result)
		 * @param attributeList - ???
		 * @param validationData - ???
		 * @private
		 */
		async __signUp(email,
					   password,
					   userMetaData: UserMetaData,
					   callback,
					   attributeList: CognitoUserAttribute[] = [],
					   validationData: CognitoUserAttribute[] = [],
		) {
			console.log(userMetaData);
			this.userPool.signUp(
				email.trim(),
				password.trim(),
				attributeList,
				validationData,
				callback,
				userMetaData
			);
		},
	}
}
