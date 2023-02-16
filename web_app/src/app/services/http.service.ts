import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {ChatDto, UnreadChatDto} from '../../../../lib/dto/Chat.dto';
import { UserDto } from '../../../../lib/dto/User.dto';
import { ISong } from '../../../../lib/types/Charts';
import { GenericResponse } from '../state/GenericResponse';
import { IDemo } from '../types/Demo';
import { IDemoplayerDemo } from '../types/DemoplayerSong';
import { IKeyValue } from '../types/KeyValue';
import { IProfile } from '../types/Profile';
import { IRating } from '../types/Rating';
import { IUpdateProfile } from '../types/UpdateProfile';
import {IFollowed} from "../types/Followed";
import {ISongFilter} from "../../../../lib/types/Demoplayer";
import {IFeedbackSubmit} from "../types/FeedbackSubmit";
import compress from "compress-base64";

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	private BASE_PATH = environment.apiPath;

	constructor(private http: HttpClient) {}

	/**
	 *  General
	 */

	getCountries(): Observable<IKeyValue[]> {
		return this.http.get<IKeyValue[]>(this.BASE_PATH + 'misc/getCountries');
	}

	getMoods(): Observable<IKeyValue[]> {
		return this.http.get<IKeyValue[]>(this.BASE_PATH + 'misc/getMoods');
	}

	getGenres(): Observable<IKeyValue[]> {
		return this.http.get<IKeyValue[]>(this.BASE_PATH + 'misc/getGenres');
	}

	/**
	 * Profile
	 */

	getUser(): Observable<UserDto> {
		return this.http.get<UserDto>(this.BASE_PATH + 'profile/getUser');
	}

	getProfile(slug: string): Observable<IProfile> {
		return this.http.get<IProfile>(this.BASE_PATH + 'profile/getProfile', {
			params: {
				slug,
			},
		});
	}


	// uploadProfilePic(fileString: string): any {
	//
	// 	function dataURLtoFile(dataurl, filename): File {
	//
	// 		let arr = dataurl.split(',');
	// 		let mime = arr[0].match(/:(.*?);/)[1];
	// 		let bstr = atob(arr[1]);
	// 		let n = bstr.length;
	// 		let u8arr = new Uint8Array(n);
	//
	// 		while(n--){
	// 			u8arr[n] = bstr.charCodeAt(n);
	// 		}
	//
	// 		return new File([u8arr], filename, {type: mime});
	// 	}
	//
	// 	let file = dataURLtoFile(fileString,'test.jpg');
	// 	console.log(file);
	// 	//
	// 	// fileChange(event) {
	// 	// 	let fileList: FileList = event.target.files;
	// 	// 	if(fileList.length > 0) {
	// 	// 		let file: File = fileList[0];
	// 	// 		let formData:FormData = new FormData();
	// 	// 		formData.append('uploadFile', file, file.name);
	// 	// 		let headers = new Headers();
	// 	// 		/** In Angular 5, including the header Content-Type can invalidate your request */
	// 	// 		headers.append('Content-Type', 'multipart/form-data');
	// 	// 		headers.append('Accept', 'application/json');
	// 	// 		let options = new RequestOptions({ headers: headers });
	// 	// 		this.http.post(`${this.apiEndPoint}`, formData, options)
	// 	// 			.map(res => res.json())
	// 	// 			.catch(error => Observable.throw(error))
	// 	// 			.subscribe(
	// 	// 				data => console.log('success'),
	// 	// 				error => console.log(error)
	// 	// 			)
	// 	// 	}
	// 	// }
	//
	//
	// 	const formData = new FormData();
	// 	formData.append('uploadFile', file, file.name);
	// 	const headers = new HttpHeaders();
	// 	headers.append('Content-Type', 'multipart/form-data');
	// 	headers.append('Accept', 'application/json');
	//
	// 	return this.http.post<GenericResponse>(
	// 		this.BASE_PATH + 'profile/uploadProfilePic',
	// 		{},
	// 		{ headers }
	// 	);
	// }

	calculateImageSize(base64String) {
		let padding;
		let inBytes;
		let base64StringLength;
		if (base64String.endsWith('==')) { padding = 2; }
		else if (base64String.endsWith('=')) { padding = 1; }
		else { padding = 0; }

		base64StringLength = base64String.length;
		console.log(base64StringLength);
		inBytes = (base64StringLength / 4) * 3 - padding;
		console.log(inBytes);
		const kbytes = inBytes / 1000;
		return kbytes;
	}

	uploadProfilePic(file: string): Observable<GenericResponse> {

		// console.log("MBytes " + this.calculateImageSize(file));
		// const compressedFile = this.compressFile(file).then(result => {
		// 	console.log("Compressed!!!")
		// 	console.log(result);
		// });

		return this.http.post<GenericResponse>(
			this.BASE_PATH + 'profile/uploadProfilePic',
			{
				file,
			}
		);
	}
	uploadProfileHeader(file: string): Observable<GenericResponse> {

		console.log("KBytes " + this.calculateImageSize(file));

		return this.http.post<GenericResponse>(
			this.BASE_PATH + 'profile/uploadProfileHeader',
			{
				file,
			}
		);
	}

	updateProfile(profileData: IUpdateProfile): Observable<GenericResponse> {
		return this.http.post<GenericResponse>(
			this.BASE_PATH + 'profile/update',
			profileData
		);
	}

	validateName(name: string): Observable<GenericResponse> {
		return this.http.post<GenericResponse>(
			this.BASE_PATH + 'profile/validateName',
			{ name: name }
		);
	}

	/**
	 * Chat
	 */

	getChats(): Observable<ChatDto[]> {
		return this.http.get<ChatDto[]>(this.BASE_PATH + 'chat/getChats');
	}

	getUnreadChats(): Observable<UnreadChatDto[]> {
		return this.http.get<UnreadChatDto[]>(this.BASE_PATH + 'chat/getUnreadChats');
	}

	createChat(participants: string[]): Observable<GenericResponse> {
		return this.http.post<GenericResponse>(
			this.BASE_PATH + 'chat/createChat',
			{ participants }
		);
	}

	markChatAsRead(chatId) {
		return this.http.post<GenericResponse>(
			this.BASE_PATH + 'chat/markAsReadChat',
			{ chatId }
		);
	}

	/**
	 * Favorites - Artist saved list
	 */

	getSavedArtists(): Observable<IFollowed[]> {
		return this.http.get<IFollowed[]>(this.BASE_PATH + 'favorites/getFollowed');
	}

	markArtist(artistID: string, added: boolean): Observable<GenericResponse> {
		return this.http.post<GenericResponse>(
			this.BASE_PATH + 'favorites/markArtist',
			{
				artistID,
				added
			}
		);
	}

	/**
	 * Demos
	 */

	uploadSong(file: Blob): Observable<any> {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		return fromEvent(reader, 'load').pipe(
			switchMap(() => {
				return this.http.post<any>(
					this.BASE_PATH + 'song/uploadSong',
					{
						file: reader.result,
					},
					{
						reportProgress: true,
						observe: 'events',
					}
				);
			})
		);
	}

	uploadCoverPic(songID: string, file: string): Observable<string> {
		console.log("UPLOAD COVER")
		return this.http.post<string>(this.BASE_PATH + 'song/uploadCover', {
			songID,
			file,
		});
	}

	updateSongDetails(
		songID: string,
		title: string,
		moodID: number,
		genreID: number
	): Observable<string> {
		return this.http.post<string>(
			this.BASE_PATH + 'song/updateSongDetails',
			{
				songID,
				title,
				moodID,
				genreID,
			}
		);
	}

	getDemos(): Observable<IDemo[]> {
		return this.http.get<IDemo[]>(this.BASE_PATH + 'song/getDemos');
	}

	deleteSong(songID: string): Observable<GenericResponse> {
		return this.http.post<GenericResponse>(
			this.BASE_PATH + 'song/deleteSong',
			{
				songID,
			}
		);
	}

	/**
	 * Payment
	 */

	buyCredits(plan: string, songID?: string): Observable<string> {
		return this.http.post<string>(this.BASE_PATH + 'mollie/buyCredits', {
			plan,
			songID,
		});
	}

	buyWithCredits(songID: string): Observable<string> {
		return this.http.post<string>(
			this.BASE_PATH + 'mollie/buyWithCredits',
			{
				songID,
			}
		);
	}

	/**
	 * Demoplayer
	 */

	getNextSong(songFilter?: ISongFilter): Observable<IDemoplayerDemo> {
		return this.http.post<IDemoplayerDemo>(
			`${this.BASE_PATH}song/getNextSong`,
			songFilter
		);
	}

	saveRating(rating: IRating): Observable<any> {
		return this.http.post(this.BASE_PATH + 'song/saveRating', rating);
	}

	/**
	 * Charts
	 */

	getCharts(genreID: number): Observable<ISong[]> {
		return this.http.post<ISong[]>(this.BASE_PATH + 'charts/getCharts', {
			genreID,
		});
	}

	/**
	 * Feedback
	 */
	submitFeedback(feedback: IFeedbackSubmit) {
		return this.http.post(this.BASE_PATH + 'feedback/submit', feedback);
	}

	/**
	 * DEBUG ONLY
	 */
	initDB() {
		return this.http.post(this.BASE_PATH + 'misc/initDB', {});
	}

	/**
	 * DEBUG ONLY
	 */
	updateDB() {
		return this.http.post(this.BASE_PATH + 'misc/updateColumns', {});
	}
}
