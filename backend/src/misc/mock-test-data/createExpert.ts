import {User} from "../../shared/models/User";
import * as faker from "faker";
import {getRandomElement} from "../../shared/helpers";
import {COUNTRIES} from "../../../../lib/types/Countries";
import {ProfileListItem} from "../../shared/models/ProfileListItem";
import {platforms, profileListItemsTitles} from "../../shared/enums";
import {SocialMedia} from "../../shared/models/SocialMedia";

export async function createExpert(email: string, uid?: string) {

    const expert = await User.create({
        uid: uid,
        email: email,
        name: faker.name.firstName(),
        userType: 2,
        approvedByAdmin: true,
        jobTitle: faker.company.bs(),
        bio:
            'artist bio Spleeter is the Deezer source separation library with pretrained models written in Python and uses Tensorflow. It makes it easy to train source separation model multi line oder so',
        countryID: getRandomElement(COUNTRIES).countryCode,
    });

    await ProfileListItem.create({
        userUid: expert.uid,
        title: profileListItemsTitles.ArtistCollaberations,
        header: 'Drake',
        description: 'haben mal ein bisschen mukke gemachtr',
        dateString: 'irgendwann',
        link:
            'https://open.spotify.com/track/2SAqBLGA283SUiwJ3xOUVI?si=Q1XAR1xmSwCkmHkLNW-R7g',
    });

    await ProfileListItem.create({
        userUid: expert.uid,
        title: profileListItemsTitles.ArtistCollaberations,
        header: 'swifty',
        description: 'sie und ich',
        dateString: '2020',
        link:
            'https://open.spotify.com/track/0b16LTzby1YRVd2nq2Z0fw?si=XMVEkwOmQMm18nMyIxNM1A',
    });

    await ProfileListItem.create({
        userUid: expert.uid,
        title: profileListItemsTitles.Skills,
        header: 'Führerschein',
        description: 'Ich kann autofahren',
        dateString: 'Vor 3 jahren',
        link: 'http://www.fahrschule-liesing.at/',
    });

    await ProfileListItem.create({
        userUid: expert.uid,
        title: profileListItemsTitles.PreviousReleases,
        header: 'HOLIDAY',
        description: 'Kleine colab mit meinem bro lil Nas',
    });



    await SocialMedia.create({
        userUid: expert.uid,
        platform: platforms.instagram,
        link: 'https://instagram.com/a',
        linkText: 'mein isntagram',
    });

    await SocialMedia.create({
        userUid: expert.uid,
        platform: platforms.facebook,
        link: 'https://facebook.com/a',
        linkText: 'mein facebook',
    });

    await SocialMedia.create({
        userUid: expert.uid,
        platform: platforms.soundcloud,
        link: 'https://soundcloud.com/a',
        linkText: 'mein soundcloud',
    });

    return expert;
}