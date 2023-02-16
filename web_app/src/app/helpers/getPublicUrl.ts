
import { environment } from 'src/environments/environment';
import {IProfile} from "../types/Profile";

export enum bucketFolders {
	profilePic = 'profilePics',
	profileHeader = 'profileHeaders',
	covers = 'covers',
	songs = 'songs',
	invoices = 'invoices',
}

export function getSongImage(uid: string) {
	return getPublicUrl(uid, bucketFolders.covers);
}
export function getProfileImage(src: string) {
	return getPublicUrl(src, bucketFolders.profilePic);
}
export default function getPublicUrl(uid: string, folder: bucketFolders, forceRefresh = false): string {
	if (!uid){
		return undefined;
	}
	let suffix = '';
	switch (folder) {
		case bucketFolders.covers:
		case bucketFolders.profilePic:
			suffix = 'jpg';
			break;
		case bucketFolders.profileHeader:
			suffix = 'jpg';
			break;
		case bucketFolders.songs:
			suffix = 'mp3';
			break;
		case bucketFolders.invoices:
			suffix = 'pdf';
			break;
	}
	const bucket = environment.s3bucket;
	if (bucket) {
		// ?timestamp=${new Date().getTime()}
		return `https://${bucket}.s3.eu-central-1.amazonaws.com/${folder}/${uid}.${suffix}`;
	} else {
		throw new Error('DATA_BUCKET env variable has to be defined');
	}
}
