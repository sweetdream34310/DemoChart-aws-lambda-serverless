import {Favorites} from "../models/Favorites";

export async function isFollowedByRequestedUser(followerUid: string, followedUid: string) {

    if (followerUid && followedUid) {
        const existsFollowship = await Favorites.findOne({
            where: {
                followerUid: followerUid,
                followedUid: followedUid
            }
        });

        return !!existsFollowship;
    }

    return false;
}