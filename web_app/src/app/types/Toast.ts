export class Toast {
	constructor(
		public content: string,
		public style: 'error' | 'info' | 'success' = 'success'
	) {}
}
