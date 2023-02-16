import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'timeDiff',
})
export class TimeDiffPipe implements PipeTransform {
	// calculates the difference of inputted and current date
	// returns diff as readable string
	transform(dateString: string): string {
		const date = new Date(dateString);
		const now = new Date();

		const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
		if (seconds <= 60) {
			return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
		}

		const minutes = Math.floor(seconds / 60);
		if (minutes <= 60) {
			return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
		}

		const hours = Math.floor(minutes / 60);
		if (hours <= 24) {
			return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
		}

		const days = Math.floor(hours / 24);
		return `${days} ${days === 1 ? 'day' : 'days'}`;
	}
}
