import { OrderMedia } from './models/OrderMedia';
import { ServiceOfferOrder } from './models/ServiceOfferOrder';
import mysql2 from 'mysql2';
import { Sequelize } from 'sequelize-typescript';
import { AdminConfigs } from "./models/AdminConfigs";
import { Country } from './models/Country';
import { Coupon } from "./models/Coupon";
import { Favorites } from "./models/Favorites";
import { Genre } from './models/Genre';
import { Listen } from './models/Listen';
import { Mood } from './models/Mood';
import { Order } from "./models/Order";
import { Payment } from './models/Payment';
import { Product } from "./models/Product";
import { ProductOrder } from "./models/ProductOrder";
import { ProfileListItem } from './models/ProfileListItem';
import { Rating } from './models/Rating';
import { Seller } from './models/Seller';
import { Gig } from './models/Gig';
import { SocialMedia } from './models/SocialMedia';
import { Song } from './models/Song';
import { UnreadChat } from "./models/UnreadChat";
import { User } from './models/User';
import { GigGenres } from './models/GigGenres';
import { GigFaq } from './models/GigFaq';
import { GigReferences } from './models/GigReferences';
import { GigMedia } from './models/GigMedia';
import { GigReview } from './models/GigReview';
import { ServiceOffer } from './models/ServiceOffer';
import { ServiceOfferFeatures } from './models/ServiceOfferFeatures';
import { GigCategories } from './models/GigCategories';
import { Category } from './models/Category';
import {SavedGigs} from "./models/SavedGigs";

/**
 * Export function that initializes Sequelize
 */
export function initDB(): void {
	console.log("process env debug", process.env);

	sequelize = new Sequelize({
		database: process.env.MYSQLDATABASE as string,
		username: process.env.MYSQLUSER as string,
		password: process.env.MYSQLPASS as string,
		host: process.env.MYSQLHOST as string,
		dialect: 'mysql',
		dialectModule: mysql2,
		models: [
			User,
			Favorites,
			Song,
			Country,
			Genre,
			Mood,
			Seller,
			Gig,
			GigFaq,
			GigGenres,
			GigCategories,
			GigReferences,
			GigMedia,
			GigReview,
			SavedGigs,
			ServiceOffer,
			ServiceOfferFeatures,
			ServiceOfferOrder,
			OrderMedia,
			Payment,
			Listen,
			Rating,
			ProfileListItem,
			SocialMedia,
			UnreadChat,
			AdminConfigs,
			Product,
			Order,
			ProductOrder,
			Coupon,
			Category
		],
	});
}

/**
 * Export the used Sequelize instance
 */
export let sequelize: Sequelize;
