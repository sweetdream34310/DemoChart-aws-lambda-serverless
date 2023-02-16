import { fileTypes } from './enums';

export const FRONTEND_URL = process.env.FRONTEND_URL as string;
export const BASE_PATH = process.env.API_BASE_PATH as string;
export const STAGE = process.env.STAGE as string;
export const LANDING_PAGE_URL = process.env.LANDING_PAGE_URL as string;

export const USER_POOL_ID = process.env.COGNITO_POOL_ID as string;

export const fileTypeImg = [fileTypes.jpeg, fileTypes.jpg, fileTypes.png];
export const fileTypeVideo = [fileTypes.mp4];

export const PROFILE_PIC_SIZE = 350;
export const COVER_SIZE = 500;

export const REFERENCE_PIC_WIDHT = 450;
export const REFERENCE_PIC_HEIGHT = 300;

export const PROFILE_HEADER_WIDTH = 1660;
export const PROFILE_HEADER_HEIGHT = 460;

export const MOLLIE = {
	API_KEY: process.env.MOLLIE_API_KEY as string,
	WEBHOOK_URL: process.env.API_BASE_PATH + '/mollie/webhook',
	RETURN_URL: process.env.FRONTEND_URL + '/mydemos',
};

export const NO_REPLY = {
	email: process.env.NO_REPLY_EMAIL as string,
	password: process.env.NO_REPLY_PASSWORD as string,
};

export const PRICING = {
	monthly: [
		{
			value: '49.00',
			currency: 'USD',
			credits: 1,
		},
	],
	yearly: [
		{
			value: '470.00',
			currency: 'USD',
			credits: 12,
		},
	],
};
