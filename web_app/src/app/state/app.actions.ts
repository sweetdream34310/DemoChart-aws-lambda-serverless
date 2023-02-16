import { Toast } from '../types/Toast';

export class InitApp {
	static readonly type = '[App] innit app';
	constructor() {}
}

export class AddToast {
	static readonly type = '[App] set toast';
	constructor(public payload: Toast) {}
}

export class CloseToast {
	static readonly type = '[App] delete toast';
	constructor(public payload: Toast) {}
}


export class SetNavigationTitle {
	static readonly type = '[App] set nav title';
	constructor(public title: string) {}
}
