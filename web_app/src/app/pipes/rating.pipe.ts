import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'rating',
})
export class RatingPipe implements PipeTransform {
	transform(index: number, rating: number): boolean {
		return index <= rating;
	}
}
