import {Handler} from 'aws-lambda';
// DB
import {initDB} from '../shared/db';
import {
	aBadRequestResponse,
	anInternalError,
	anInternalErrorResponse,
	genericResponse,
	startupRoutine
} from '../shared/helpers';
import {User} from '../shared/models/User';
import sendApprovedByAdmin from "../shared/mails/sendApprovedByAdmin";
import {UserTypes} from "../../../lib/types/UserTypes";
import sendDeclinedByAdmin from "../shared/mails/sendDeclinedByAdmin";
import {Seller} from "../shared/models/Seller";

initDB();


/**
 * Approve or decline user
 * @param body
 * @param callback
 */
const approveOrDeclineUser = async (body: any, callback: any) => {
	try {
		const declined = body.declined;
		if (!body.uid) return aBadRequestResponse(callback, 'No uid given.');

		const userExists = await User.findOne(
			{ where: { uid: body.uid } }
		);

		if (!userExists) return aBadRequestResponse(callback, 'User not found');

		console.log("body", body);
		console.log("declined: ", declined);

		if (!declined) {
			console.log("Approve user: " + body.uid)
			const userToApprove = await User.update(
				{
					approvedByAdmin: true,
					approvedByAdminDate: new Date(),
					declinedByAdmin: null
				},
				{where: {uid: body.uid}}
			);

			await sendApprovedByAdmin(userExists.email, {firstName: userExists.firstName, role: userExists.userType});
		} else {
			console.log("Decline user: " + body.uid)
			const userToDecline = await User.update(
				{ declinedByAdmin: new Date() },
				{where: {uid: body.uid}}
			);

			await sendDeclinedByAdmin(userExists.email,{firstName: userExists.firstName, role: userExists.userType});
		}

	} catch (e: any) {
		return anInternalError(e);
	}
}

/**
 * Create seller, once.
 * @param event
 * @param context
 * @param callback
 */
const createSeller = async (body: any, callback: any) => {
	try {
		let foundSeller = await Seller.findOne( { where: { userUid: body.uid } });

		if (foundSeller) {
			return aBadRequestResponse(callback, 'Seller already created!');
		}

		const sellerOptions: any = {
			userUid: body.uid
		}

		let seller = await Seller.upsert(sellerOptions);
		return;
	} catch (e: any) {
		return anInternalErrorResponse(callback, 'Error creating seller, e:' + e);
	}
}


/**
 * Toggle the status of a seller. Either activate it to set the profile public or deactivate it.
 * @param event
 * @param context
 * @param callback
 */
const setSellerActivationStatus = async (body: any, callback: any) => {
	try {
		await Seller.update(
			{ approvedByAdmin: body.approved },
			{ where: { userUid: body.uid } }
		);
		return;
	} catch (e: any) {
		return anInternalErrorResponse(callback, 'updating seller failed.' + e);
	}

}


export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);

	const body = event?.body;

	console.log("srcUpdateUser:", body)

	switch (body.action) {
		case 'approve-or-decline': await approveOrDeclineUser(body, callback); break;
		case 'create-seller': await createSeller(body, callback); break;
		case 'seller-status': await setSellerActivationStatus(body, callback); break;
	}


	const updatedUser = await User.findOne({
		where: { uid: body.uid },
		include: [
			{
				model: Seller
			},
		]
	});

	return {
		user: updatedUser
	}
};
