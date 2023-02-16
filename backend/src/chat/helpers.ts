import { ApiGatewayManagementApi } from 'aws-sdk';

export class WsClient {
	client: ApiGatewayManagementApi;

	constructor() {
		this.client = new ApiGatewayManagementApi({
			apiVersion: '2018-11-29',
			endpoint: `https://${process.env.WS_DOMAIN}`,
		});
		this.client.config;
	}

	async send(ConnectionId: string, message: any): Promise<any> {
		return this.client
			.postToConnection({
				ConnectionId,
				Data: JSON.stringify(message),
			})
			.promise()
			.catch((e) => {
				console.error('Error during sending Message');
				console.error(JSON.stringify(e));
			});
	}
}
