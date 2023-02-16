export const environment = {
	production: true,


	// Cognito User Pool
	UserPoolId: 'eu-central-1_wB8KxCHC2',
	ClientId: 'pgm1t7mnh29r2qb6p0qrc7so2',

	// Test User => empty in prod env
	email: '',
	password: '',

	s3bucket: 'backend-s3buckets-prod-databucket-9l2k34x7k8s',

	// API basepath
	apiPath: 'https://api.democharts.org/',

	// websocket basepath
	websocketPath: 'wss://ws.democharts.org',
};
