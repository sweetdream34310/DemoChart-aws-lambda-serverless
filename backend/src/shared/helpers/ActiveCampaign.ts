const apiKey = 'e2350f47a2da283d5d2dadaaf7ae0a5ee277507743f44493a047311f1d73dedc3054814a';
const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://democharts.api-us1.com/',
    timeout: 4000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Api-Token': apiKey,
        'Host': 'democharts.api-us1.com',
        'Content-Length': 201,
    }
});


interface AddContactCampaign {
    email: string;
    firstName: string;
    lastName: string;
    fieldValues: any;
}
export async function addToActiveCampaign(params: AddContactCampaign) {

    await instance.post('/api/3/contacts', {
        contact: params
    })
}