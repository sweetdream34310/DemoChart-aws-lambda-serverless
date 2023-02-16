import { ServiceOfferFeatures } from './../shared/models/ServiceOfferFeatures';
import { ServiceOffer } from './../shared/models/ServiceOffer';
import { User } from '../shared/models/User';
import { Handler } from 'aws-lambda';
import { Gig } from '../shared/models/Gig';
import { initDB } from '../shared/db';
import { startupRoutine, aBadRequestResponse, getPublicUrl } from '../shared/helpers';
import { Seller } from '../shared/models/Seller';
import { bucketFolders } from '../shared/enums';

initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);
	const body: any = event?.body;
	const { userUid } = body;

	try {
		let seller = await Seller.findOne(
			{ 
				where: { userUid: userUid },
				include: [
				{
					model: Gig,
					required: false,
					include: [
						{
							model: ServiceOffer,
							attributes: ["offerPrice"],
							required: false
						}
					]
				},
				{
					model: User,
					required: false
				}
				]
			},
			
		);

		if (seller?.profileImageSrc != null && seller?.profileImageSrc  != "" && !seller?.profileImageSrc.startsWith("https")) {
			seller.profileImageSrc = getPublicUrl(seller?.profileImageSrc, bucketFolders.marketplace, "backend-s3buckets-dev-databucket-mnzmiczicq8f")
		}

		console.log("HERE WE ARE");
		console.log(seller);

		return seller;
	} catch (e) {
		console.error(e);
		return aBadRequestResponse(callback, JSON.stringify(e));
	}
};
