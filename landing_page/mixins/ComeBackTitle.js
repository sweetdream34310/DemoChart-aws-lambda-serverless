

export const comeBackTitle = {
	data() {
		return {
			activeTitle: undefined,
		}
	},
	methods: {
		checkFocus() {

			if ( document.hasFocus() ) {
				this.title = this.activeTitle;
			} else {
				this.title = 'Hey, come back!';
			}
		},
	},
	mounted() {
		this.activeTitle = this.title;
		console.log("MOUNTED comebacktitle")
		setInterval(this.checkFocus, 200)
	}
}
