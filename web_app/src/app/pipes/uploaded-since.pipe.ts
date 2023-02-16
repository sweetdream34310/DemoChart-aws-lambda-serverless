import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'uploadedSince',
})
export class UploadedSincePipe implements PipeTransform {
	transform(date: string): number {
		const uploadDate = new Date(date);

		const difference = Date.now() - uploadDate.getTime();
		const uploadedSinceHours = Math.ceil(difference / (1000 * 3600));
		return uploadedSinceHours;
	}
}
