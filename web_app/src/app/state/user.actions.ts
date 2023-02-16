import { UserDto } from '../../../../lib/dto/User.dto';
import {CognitoUserSession} from "amazon-cognito-identity-js";

export class SetUser {
	static readonly type = '[User] set user';
	constructor(public payload: UserDto) {}
}

export class GetUser {
	static readonly type = '[User] get user data';
	constructor() {}
}

export class SetLoggedIn {
	static readonly type = '[User] set loggedIn';
	constructor(public payload: boolean) {}
}

export class SetAuthSession {
	static readonly type = '[User] set auth session';
	constructor(public payload: CognitoUserSession) {}
}

export class IncreametRatings24 {
	static readonly type = '[User] increment ratings24';
	constructor() {}
}
