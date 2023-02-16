import { Pipe, PipeTransform } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppStateModel } from '../state/app.state';

@Pipe({
	name: 'labelSearch',
})
export class LabelSearchPipe implements PipeTransform {
	@Select((state) => state.app) app$: Observable<AppStateModel>;

	transform(
		id: number,
		arg: 'moods' | 'countries' | 'genres'
	): Observable<string> {
		return this.app$.pipe(
			map((e) => {
				const temp = e[arg].find((e) => e[0] === id);
				if (temp) {
					return temp[1];
				} else {
					return 'undefined';
				}
			})
		);
	}
}
