const { compileFromFile } = require('json-schema-to-typescript');
const fs = require('fs');
const glob = require('glob');

// Scans ./src for all schema files
glob('**/schema/*.json', function (er, files) {
	files.forEach((file) => {
		// Writes a .d.ts file for every schema
		compileFromFile(file).then((ts) => {
			const parts = file.split('/');
			fs.writeFileSync(
				`./typings/${parts[parts.length - 1].split('.')[0]}.d.ts`,
				ts
			);
		});
	});
});
