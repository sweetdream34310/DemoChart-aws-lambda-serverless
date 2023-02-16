import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'limitNgFor',
})
export class LimitNgForPipe implements PipeTransform {
	public transform(items: [], limit: number) {
		return items.slice(0, limit);
	}
}
