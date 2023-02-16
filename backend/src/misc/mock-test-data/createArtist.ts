import {User} from "../../shared/models/User";
import * as faker from "faker";
import {getRandomElement} from "../../shared/helpers";
import {COUNTRIES} from "../../../../lib/types/Countries";
import {ProfileListItem} from "../../shared/models/ProfileListItem";
import {platforms, profileListItemsTitles} from "../../shared/enums";
import {SocialMedia} from "../../shared/models/SocialMedia";
import {Song} from "../../shared/models/Song";
import {MOODS} from "../../../../lib/types/Moods";
import {GENRES} from "../../../../lib/types/Genres";
import {Rating} from "../../shared/models/Rating";

export async function createArtist(email: string, uid?: string, name?: string) {
    const artist = await User.create({
        uid: uid,
        email: email,
        name: name ? name : faker.name.firstName(),
        userType: 1,
        approvedByAdmin: true,
        jobTitle: faker.company.bs(),
        bio:
            'artist bio Spleeter is the Deezer source separation library with pretrained models written in Python and uses Tensorflow. It makes it easy to train source separation model multi line oder so',
        countryID: getRandomElement(COUNTRIES).countryCode,
    });


    await ProfileListItem.create({
        userUid: artist.uid,
        title: profileListItemsTitles.PreviousReleases,
        header: 'swifty',
        description: 'sie und ich',
    });
    await SocialMedia.create({
        userUid: artist.uid,
        platform: platforms.instagram,
        link: 'https://instagram.com/a',
        linkText: 'mein isntagram',
    });

    await SocialMedia.create({
        userUid: artist.uid,
        platform: platforms.facebook,
        link: 'https://facebook.com/a',
        linkText: 'mein facebook',
    });


    await ProfileListItem.create({
        userUid: artist.uid,
        title: profileListItemsTitles.PreviousReleases,
        header: 'Drake',
        description: 'haben mal ein bisschen mukke gemachtr',
        dateString: 'irgendwann',
        link: 'https://example.com',
    });

    await SocialMedia.create({
        userUid: artist.uid,
        platform: platforms.soundcloud,
        link: 'https://soundcloud.com/a',
        linkText: 'mein soundcloud',
    });

    return artist;
}