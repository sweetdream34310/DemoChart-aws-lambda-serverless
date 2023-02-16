
import { Model } from "sequelize-typescript";
import getSlug from "speakingurl";
import {User} from "../models/User";


export default async (preSlug: string , existsFunction: Function): Promise<string> => {

    const slug = await getSlug(preSlug, {
        lang: 'en',
    });
    // slug still available?

    let available = false;
    let tries = 0;

    while (!available) {
        const trySlug = slug + '-' + tries;
        const slugExists = await existsFunction(tries === 0 ? slug : trySlug);

        console.log("trySlug: " + trySlug + " slugExists " + slugExists + " ");
        if (!slugExists) {
            available = true;
            if (tries === 0) {
                return slug;
            } else {
                return trySlug
            }
        } else {
            tries ++;
        }
    }
    return '';
}