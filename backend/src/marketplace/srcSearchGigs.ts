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

const { Op, Sequelize} = require("sequelize");

initDB();

export const handler: Handler = async (event, context, callback) => {
    startupRoutine(event);

    const body: any = event?.body;
    const { categories, genres } = body;

    console.log("search gigs for: ", categories, genres);

    try {
        let gigsByCategories: Gig[] = [];
        let gigsByGenres: Gig[] = [];

        const gigs: Gig[] = await Gig.findAll({
            include: [
                {
                    model: GigCategories,
                    attributes: ["categoryCode"]
                },
                {
                    model: GigGenres,
                    attributes: ["genreId"]
                }
            ]
        });

        // TODO use SQL where
        if (categories && categories.length > 0 && gigs.length > 0) {
            gigsByCategories = gigs.filter(gig => gig.gigCategories?.filter(category => categories.includes(category.categoryCode)).length > 0);
        }

        if (genres && genres.length > 0 && gigs.length > 0) {
            gigsByGenres = gigs.filter(gig => gig.gigGenres?.filter(genre => genres.includes(genre.genreId)).length > 0);
        }

        console.log("gigsFound: ", gigsByCategories, gigsByGenres);
        return {
            gigsByCategory: gigsByCategories,
            genres: gigsByGenres
        }
    } catch (e) {
        console.error(e);
        return aBadRequestResponse(callback, JSON.stringify(e));
    }
};
