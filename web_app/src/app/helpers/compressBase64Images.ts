import Compress from 'client-compress';

export const PROFILE_PIC_SIZE = 350;
export const COVER_SIZE = 500;
export const PROFILE_HEADER_WIDTH = 1660;
export const PROFILE_HEADER_HEIGHT = 460;

function dataURLtoFile(dataurl, filename): File {

	const arr = dataurl.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (n--){
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, {type: mime});
}

export async function compressImage(base64string, width, height) {

	const options = {
		targetSize: 1.5,
		quality: 0.9,
		minQuality: 0.4,
		resize: false,
		// maxWidth: width,
		// maxHeight: height
	};

	const compress = new Compress(options);
	const conversions = await compress.compress([dataURLtoFile(base64string, 'image.jpeg')]);
	const {photo, info} = conversions[0];


	return Compress.blobToBase64(photo.data);
}
