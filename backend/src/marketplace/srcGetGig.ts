import { bucketFolders } from './../shared/enums';
import { GigCategories } from '../shared/models/GigCategories';
import { Handler } from 'aws-lambda';
import { Seller } from '../shared/models/Seller';
import { initDB } from '../shared/db';
import {
	startupRoutine, aBadRequestResponse, getPublicUrl
} from '../shared/helpers';
import { Gig } from '../shared/models/Gig';
import { GigGenres } from '../shared/models/GigGenres';
import { GigFaq } from '../shared/models/GigFaq';
import { GigReferences } from '../shared/models/GigReferences';
import { GigMedia } from '../shared/models/GigMedia';
import { ServiceOffer } from '../shared/models/ServiceOffer';
import { ServiceOfferFeatures } from '../shared/models/ServiceOfferFeatures';
import { Genre } from '../shared/models/Genre';
import { Category } from '../shared/models/Category';

initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);

	const body: any = event?.body;
	const { slug } = body;

	try {
			var gig = await Gig.findOne({
                where: { slug: slug },
				include: [{
					model: Seller,
					required: true //TODO: include 2 best Gigs for SellerShortDescription (only name); include User (country, etc)
				},
				{
					model: GigGenres,
					include: [{
						model: Genre,
						required:false
					}],
					required: false
				},
				{
					model: GigFaq,
					required: false
				},
				{
					model: GigReferences,
					required: false
				},
				{
					model: GigCategories,
					include: [{
						model: Category,
						required:false
					}],
					required: false
				},
				{
					model: GigMedia,
					required: false
				},
				{
					model: ServiceOffer,
					include: [{
						model: ServiceOfferFeatures,
						required:false
					}],
					required: false
				}
				]
			});

		gig?.gigReferences && gig?.gigReferences.forEach(reference => {
			if (reference.img!= null && reference.img != "" && !reference.img.startsWith("https")) {
				reference.img = getPublicUrl(reference.img, bucketFolders.marketplace, "backend-s3buckets-dev-databucket-mnzmiczicq8f")
			} 
		});

		gig?.gigMedias && gig?.gigMedias.forEach(media => {
			if (media.mediaUrl != null && media.mediaUrl != "" && !media.mediaUrl.startsWith("https")) {
				media.mediaUrl = getPublicUrl(media.mediaUrl, bucketFolders.marketplace, "backend-s3buckets-dev-databucket-mnzmiczicq8f", media.isVideo)
			}
		});

		gig?.gigFaqs.sort((a:any, b:any) => a.arrayPosition - b.arrayPosition)
		gig?.gigMedias.sort((a:any, b:any) => a.arrayPosition - b.arrayPosition)
		gig?.gigReferences.sort((a:any, b:any) => a.arrayPosition - b.arrayPosition)
		gig?.gigServiceOffers.sort((a:any, b:any) => a.arrayPosition - b.arrayPosition)

		gig?.gigServiceOffers.forEach(serviceOffer => {
			serviceOffer.features.sort((a:any, b:any) => a.arrayPosition - b.arrayPosition)
		})
		
		return gig;
	} catch (e) {
		console.error(e);
		return aBadRequestResponse(callback, JSON.stringify(e));
	}
};
