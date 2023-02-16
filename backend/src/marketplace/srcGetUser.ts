import { User } from '../shared/models/User';
import { Handler } from 'aws-lambda';
import { initDB } from '../shared/db';
import { startupRoutine, aBadRequestResponse } from '../shared/helpers';
import { Seller } from '../shared/models/Seller';
import { AvatarGenerator } from 'random-avatar-generator';

initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);
    const userUid = event?.cognitoPoolClaims?.sub;
	const body: any = event?.body;
	const { buyerUid } = body;
    let user;
	try {
        if (buyerUid) {
            user = await User.findOne(
                { 
                    where: { uid: buyerUid },
                }
            );
        } else {
            user = await User.findOne(
                { 
                    where: { uid: userUid },
                    include: [
                        {
                            model: Seller,
                            required: false,
                        }
                    ]
                },
                
            );
        }

        if (!user?.profileImageSrc) {
            const generator = new AvatarGenerator();
            const randomAvatar = generator.generateRandomAvatar();

            user!.profileImageSrc = randomAvatar
            
            const userObj = {
                profileImageSrc: randomAvatar,
                uid: user?.uid
            }
            
            await User.upsert(userObj)
        }

		return user;
	} catch (e) {

		console.error(e);
		return aBadRequestResponse(callback, JSON.stringify(e));
	}
};
