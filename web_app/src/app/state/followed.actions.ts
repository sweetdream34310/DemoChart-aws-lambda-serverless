export class GetFollowed {
	static readonly type = '[Followed] get followed';
	constructor() {}
}

export class MarkFollowed {
	static readonly type = '[Followed] add or remove followed';
	constructor(public uid: string, public add: boolean, public cb: (succeed, uid, add) => void) {}
}
