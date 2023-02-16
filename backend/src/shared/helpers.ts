import { REFERENCE_PIC_WIDHT, REFERENCE_PIC_HEIGHT, fileTypeImg } from './config';
import { S3 } from 'aws-sdk';
import { fromBuffer } from 'file-type';
import { bucketFolders, fileTypes } from './enums';
import sharp from 'sharp';

const s3 = new S3();
const bucket = "backend-s3buckets-dev-databucket-mnzmiczicq8f";

/**
 * Code that should be executed at the start of every lambda function
 * @param event lambda event
 */
export function startupRoutine(event: any): void {
	// console.log(JSON.stringify(event));

	// disable serverless' default json schema
	if (
		event?.headers?.['Content-Type'] === 'application/x-www-form-urlencoded'
	) {
		badRequestReturn();
	}
}

/**
 * @deprecated
 * Bad request: Client side failure
 */
export function badRequestReturn(message?: string): any {
	const response = {
		statusCode: 400,
		body: message
			? JSON.stringify(message)
			: 'no message provided',
	};
	return response;
	// throw new Error(JSON.stringify(response));
}

/**
 * Bad Request
 */
export function aBadRequestResponse(callback: any, message?: string): any {
	console.warn('[400]', message);
	callback(new Error('[400]'+(message ? message : 'no message provided.')));
}

/**
 * Unauthorized
 */
export function anUnauthorizedResponse(callback: any, message?: string): any {
	console.warn('[401]', message);
	callback(new Error('[401]'+(message ? message : 'no message provided.')));
}
/**
 * Not found
 */
export function aNotFoundResponse(callback: any, message?: string): any {
	console.warn('[404]', message);
	callback(new Error('[404]'+(message ? message : 'no message provided.')));
}

/**
 * Internal Error
 */
export function anInternalErrorResponse(callback: any, message?: any): any {
	console.error('[501]', message);
	callback(new Error('[501]'+(message
			? JSON.stringify(message)
			: 'Undefined Error Message'
	)));
}

/**
 * @deprecated
 * Return this in case of an error and if it's not the users input fault
 * @param message
 */
export function anInternalError(message?: string): any {
	const responseObj = {
		statusCode: 501,
		body: message
			? JSON.stringify(message)
			: 'Undefined Error Message',
	};
	console.error('501 Error thrown:');
	console.error(message);

	return responseObj;
	// throw new Error(JSON.stringify(responseObj));
}

/**
 * generic response
 */
export function genericResponse(success = true): { success: boolean } {
	return {
		success,
	};
}

/**
 * Parses objectUrl to buffer
 * @param objectUrl objectUrl
 */
export function objectUrlToBuffer(objectUrl: string): Buffer {
	// The firt comma seperates the meta data and the data portion.
	const firstCOmma = objectUrl.indexOf(',');
	const data = objectUrl.substring(firstCOmma + 1);
	return Buffer.from(data, 'base64');
}

/**
 * Upload file to s3 bucket
 * @param file Buffer
 * @param key File name
 * @param fileType the allowed file types
 * @param suffix the suffix that is used to store the file in s3
 * @param bucket Bucket name
 * @param folder folder name
 */
export async function uplaodToBucket(
	file: Buffer,
	key: string,
	fileType: fileTypes | fileTypes[],
	suffix: string,
	bucket: string,
	folder: bucketFolders
): Promise<string> {
	const type = await fromBuffer(file);
	const filename = `${key}.${suffix}`;

	if (!Array.isArray(fileType)) {
		fileType = [fileType];
	}

	// check filetype
	const filetypeValid = fileType.includes(type?.ext as fileTypes);
	if (!filetypeValid) {
		return Promise.reject(`Better luck next time. Fileype ${fileType} is not supported`);
	}

	const params = {
		Body: file,
		Bucket: `${bucket}/${folder}`,
		Key: filename,
	};

	try {
		await s3.putObject(params).promise();
	} catch (e) {
		console.error(e);
		return Promise.reject('Error uploading to S3');
	}

	// Return URL of uplaoded object.
	// Only  accessible if bucket is public
	return `https://${bucket}.s3.eu-central-1.amazonaws.com/${folder}/${filename}`;
}

export function getPublicUrl(uid: string, folder: bucketFolders, devBucket?:string, isVideo:boolean = false, suffix:string = ''): string {
	switch (folder) {
		case bucketFolders.covers:
		case bucketFolders.profilePic:
			suffix = 'jpg';
			break;
		case bucketFolders.profileHeader:
			suffix = 'jpg';
			break;
		case bucketFolders.marketplace:
			if (suffix === '') {
				isVideo ? suffix = 'mp4' : suffix = 'jpg';
			}
			break;
		case bucketFolders.songs:
			suffix = 'mp3';
			break;
		case bucketFolders.invoices:
			suffix = 'pdf';
			break;
	}
	const bucket = process.env.DATA_BUCKET;
	if (devBucket) {
		return `https://${devBucket}.s3.eu-central-1.amazonaws.com/${folder}/${uid}.${suffix}`;
	} else if (bucket) {
		return `https://${bucket}.s3.eu-central-1.amazonaws.com/${folder}/${uid}.${suffix}`;
	} else {
		throw new Error('DATA_BUCKET env variable has to be defined');
	}
}

/**
 * Returns a random element from the inputted array
 * @param arr
 */
export function getRandomElement<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * bulk upserts any model
 * @param model the model to bulk upsert
 * @param array the array to bulk upsert
 */
export async function bulkUpsert(model: any, array: any) {
	const promise = [];

		for(let i = 0; i < array.length; i++) {
			promise.push(model.upsert(array[i]));
		}
		await Promise.all(promise).catch((e) => {
			console.error(e)
		})
};


/**
 * 
 * @param model Parent model to bulk upsert
 * @param model2 Nested model in parent to bulkupsert
 * @param array array with elements to upsert
 */
export async function bulkUpertNested(model: any, model2:any,  array: any){
	for(let i = 0; i < array.length; i++) {
		const offer = array[i]
		const element = await model.upsert(offer);
		const elementUid = element[0].uid
		if (array[i].hasOwnProperty('features')) {
			for(let j = 0; j < array[i].features.length; j++) {
				array[i].features[j].serviceOfferUid = elementUid
				await model2.upsert(array[i].features[j]).catch((e:Error) => {
					console.error(e)
				});
			}
		}
	}
}