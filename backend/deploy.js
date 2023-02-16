const { exec } = require('child_process');

var myArgs = process.argv.slice(2);

console.log(process.argv);
console.log("myargs.", myArgs);

changedFolders = [];

// Filters all backend folders with changed code
myArgs.forEach((e) => {
	if (e.startsWith('backend/src')) {
		const folder = e.split('/')[2];
		if (!changedFolders.includes(folder)) {
			changedFolders.push(folder);
		}
	}
});

// If shared folder changes deploy all dependant sls projects
if (changedFolders.includes('shared')) {
	const temp = ['signup', 'dashboard'];

	// checks if dependat folders also have changes
	changedFolders.forEach((e) => {
		if (!temp.includes(e) && e !== 'shared') {
			temp.push(e);
		}
	});

	changedFolders = temp;
}

console.log(changedFolders);

changedFolders.forEach((e) => {
	exec(
		`cd backend/src/${e}/; sls deploy -s prod`,
		(error, stdout, stderr) => {
			console.log(`Deploying ${e} ...`);
			if (error || stderr) {
				console.error(error.message);
				console.log(stdout);
				throw Error(`Failed to deploy ${e}`);
			}

			console.log(stdout);
		}
	);
});
