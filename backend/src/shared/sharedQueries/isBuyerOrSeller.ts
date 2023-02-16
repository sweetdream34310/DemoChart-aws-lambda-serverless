import {ServiceOfferOrder} from '../models/ServiceOfferOrder';
import {Seller} from '../models/Seller';
import { Op } from 'sequelize';
export const getSellerOrBuyerConditionServiceOfferOrder = async(userUid: string): Promise<{seller: Seller|null, condition: any}> => {
    const foundSeller = await Seller.findOne(
        {
            where: { userUid: userUid },
            attributes: ["uid"],
        },
    );

    let whereAddon;
    if (foundSeller) {
        whereAddon = {[Op.or]: [{ sellerUid: foundSeller.uid }, {buyerUid: userUid}]};
    } else {
        whereAddon = { buyerUid: userUid };
    }

    return {seller: foundSeller, condition: whereAddon};
}

/**
 * function requires ServiceOfferOrder to be populated with ServiceOffer, Gig,
 * @param userUid
 * @param order
 */
export const isSeller = (sellerUid: string, order: ServiceOfferOrder): boolean=> {
    return sellerUid === order.sellerUid;
}

export const isBuyer = (userUid: string, order: ServiceOfferOrder): boolean => {
    return userUid === order.buyerUid;
}