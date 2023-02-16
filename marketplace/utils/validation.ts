export const checkIfOffersEmpty = (offers: any) => {
    return offers.every((obj: any) => {
        return Object.keys(obj).length >= 6 && obj.offerName != "" && obj.offerDescription != "" && obj.numRevisions != null && obj.offerPrice != null && obj.deliveryTime != null && obj.features[0].name != "" && obj.features[1].name != "" ;
    })
}

export const checkIfFaqEmpty = (faqs: any) => {
    return faqs.every((faq: any) => {
        return faq.question != "" && faq.answer != ""
    })
}