import { Pipe, PipeTransform } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
	name: 'isMe',
})
// Pipe that finds out if a message was sent from the loggedin suer
export class IsMePipe implements PipeTransform {
	@Select((state) => state.app.user.uid) loggedInUid$: Observable<string>;

	transform(senderUid: string): Observable<boolean> {
		return this.loggedInUid$.pipe(map((e) => e === senderUid));
	}
}
