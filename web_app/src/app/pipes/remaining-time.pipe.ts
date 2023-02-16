import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'remainingTime',
})
export class RemainingTimePipe implements PipeTransform {
	transform(date: string, days: number): number {
		const uploadDate = new Date(date);

		const difference = Date.now() - uploadDate.getTime();
		let daysRemaining = days - Math.ceil(difference / (1000 * 3600 * 24));
		if (daysRemaining < 0) {
			daysRemaining = 0;
		}
		return daysRemaining;
	}
}
