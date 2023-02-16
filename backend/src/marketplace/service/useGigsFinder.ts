import {Op} from "sequelize";
import {Gig} from "../../shared/models/Gig";
import {Seller} from "../../shared/models/Seller";
import {GigMedia} from "../../shared/models/GigMedia";
import {ServiceOffer} from "../../shared/models/ServiceOffer";
import {GigCategories} from "../../shared/models/GigCategories";
import {GigGenres} from "../../shared/models/GigGenres";
import {SavedGigs} from "../../shared/models/SavedGigs";
import {anInternalErrorResponse, getPublicUrl} from "../../shared/helpers";
import {bucketFolders} from "../../shared/enums";
import {Sequelize} from "sequelize-typescript";


export interface GigFinderParams {
    searchString?: string;
    genres?: any;
    categories?: any;
    groupby?: any;
    sellerUid?: any;
    gigsPerPage?: any;
    page?: any;

    userUid?: string;
    showSavedGigsOnly?: boolean;
}

export default async function useGigsFinder(params: GigFinderParams, callback: any) {

    const { searchString, genres, categories, groupby, sellerUid, gigsPerPage, page, userUid, showSavedGigsOnly } = params;

    const showPerPage = gigsPerPage ? gigsPerPage : 16
    const offset = showPerPage * Number.parseInt(page || 0);

    let gigCount: number = 0;

    try {

        let whereField: any = {};

        if (sellerUid) whereField.sellerUid = sellerUid;
        if (searchString) whereField.name = {
            [Op.substring]: searchString
        }


        const includeArr: any[] = [
            {
                model: Seller,
                required: true
            },
            {
                model: GigMedia,
                required: true
            },
            {
                model: ServiceOffer,
                attributes: ["offerPrice"],
                required: true
            },
            {
                model: GigCategories,
                attributes: ["categoryCode"]
            },
            {
                model: GigGenres,
                attributes: ["genreId"]
            },
        ]

        if (userUid) includeArr.push({
            model: SavedGigs,
            attributes: ["userUid"],
            required: !!showSavedGigsOnly,
            where: {
                userUid: userUid,
            }
        })

        // if (userUid) whereField.userUid

        console.log("User id:", userUid);
        console.log("Include array:", includeArr);


        // Filter with search string
        const gigs: Gig[] = await Gig.findAll({
            where: whereField,
            include: includeArr,
        });

        // gig data for response
        let gigsRes: any[] = gigs;

        // Filter with categories and genres
        if (categories && categories.length > 0 && gigsRes.length > 0) {
            let tempGig: Gig[] = [];
            tempGig = gigsRes.filter(gig => gig.gigCategories?.filter((category: any) => categories.includes(category.categoryCode)).length > 0);
            gigsRes = tempGig;
        }

        if (genres && genres.length > 0 && gigsRes.length > 0) {
            let tempGig: Gig[] = [];
            tempGig = gigsRes.filter(gig => gig.gigGenres?.filter((genre: any) => genres.includes(genre.genreId)).length > 0);
            gigsRes = tempGig;
        }

        // filter by groupby.
        if (groupby && groupby.length > 0 && gigsRes.length > 0) {
            let groupFilterValue: number = 0;
            let tempGig: Gig[] = [];

            if (groupby.category) {
                groupFilterValue = groupby.category
                if (gigsRes.length > 0) {
                    tempGig = gigsRes.filter(gig => gig.gigCategories?.filter((category: any) => category.categoryCode == groupFilterValue))
                }
            }

            if (groupby.genre) {
                groupFilterValue = groupby.genre
                if (gigsRes.length > 0) {
                    tempGig = gigsRes.filter(gig => gig.gigGenres?.filter((genre: any) => genre.genreId == groupFilterValue))
                }
            }
            gigsRes = tempGig;
        }

        gigCount = gigsRes.length;
        gigsRes.slice(offset, offset + showPerPage)


        console.log("GigResults sliced", gigsRes);

        gigsRes.forEach(gig => {
            /** Media preps **/
            gig?.gigMedias && gig?.gigMedias.forEach((media: any) => {
                if (media.mediaUrl != null && media.mediaUrl != "" && !media.mediaUrl.startsWith("https")) {
                    media.mediaUrl = getPublicUrl(media.mediaUrl, bucketFolders.marketplace, "backend-s3buckets-dev-databucket-mnzmiczicq8f") // TODO change for prod!
                }
            })

            /** Profile image preps **/
            if (gig?.seller?.profileImageSrc != null && gig?.seller?.profileImageSrc != "" && !gig?.seller?.profileImageSrc.startsWith("https")) {
                gig.seller.profileImageSrc = getPublicUrl(gig?.seller?.profileImageSrc, bucketFolders.marketplace, "backend-s3buckets-dev-databucket-mnzmiczicq8f")
            }

            /** user saved this gig preps **/
            const savedByUser = gig.savedByUser as SavedGigs[];
            gig.dataValues.savedByUser = savedByUser?.length > 0;
        })

        // console.log("?!?!?!", gigsRes)
        return { gigsRes, gigCount };

    } catch (error) {
        return anInternalErrorResponse(callback, error);
    }



    // pagenation part

    // try {
    // 	const gigCount = await Gig.count({
    // 		where: {
    // 			active: true
    // 		}
    // 	});
    // 	if (sellerUid) {
    // 		gigs = await Gig.findAll({
    // 			attributes: ['uid', 'active', 'name', 'price', 'slug'],
    // 			include: [
    // 				{
    // 					model: GigMedia,
    // 					required: true
    // 				}
    // 			],
    // 			where: { sellerUid: sellerUid },
    // 		});
    // 	} else {
    // 		gigs = await Gig.findAll({
    // 			where: { active: true },
    // 			attributes: ['uid', 'active', 'name', 'price', 'slug'],
    // 			include: [{
    // 				model: Seller,
    // 				required: true
    // 			},
    // 			{
    // 				model: GigMedia,
    // 				required: true
    // 			},
    // 			{
    // 				model: ServiceOffer,
    // 				attributes: ["offerPrice"],
    // 				required: true
    // 			}
    // 			],
    // 			limit: showPerPage,
    // 			offset: offset,
    // 		});
    // 	}
    // 	gigs.forEach(gig => {
    // 		gig?.gigMedias && gig?.gigMedias.forEach(media => {
    // 			if (media.mediaUrl != null && media.mediaUrl != "" && !media.mediaUrl.startsWith("https")) {
    // 				media.mediaUrl = getPublicUrl(media.mediaUrl, bucketFolders.marketplace, "backend-s3buckets-dev-databucket-mnzmiczicq8f")
    // 			}
    // 		})
    // 		if (gig?.seller?.profileImageSrc != null && gig?.seller?.profileImageSrc != "" && !gig?.seller?.profileImageSrc.startsWith("https")) {
    // 			gig.seller.profileImageSrc = getPublicUrl(gig?.seller?.profileImageSrc, bucketFolders.marketplace, "backend-s3buckets-dev-databucket-mnzmiczicq8f")
    // 		}
    // 	})
    // 	return { gigs, gigCount };
    // } catch (e) {
    // 	console.error(e);
    // 	return aBadRequestResponse(callback, JSON.stringify(e));
    // }
}