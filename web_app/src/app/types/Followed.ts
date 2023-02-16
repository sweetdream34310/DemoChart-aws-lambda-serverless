import {IProfile} from "./Profile";

export interface IFollowed {
	followerUid: string;
	followedUid: string;
	followedAt: string;
	name: string;
	bio: string;
	jobTitle: string;
	followed: IProfile;
}
