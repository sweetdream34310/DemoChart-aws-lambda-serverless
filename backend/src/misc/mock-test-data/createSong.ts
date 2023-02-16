import {Song} from "../../shared/models/Song";
import * as faker from "faker";
import {getRandomElement} from "../../shared/helpers";
import {MOODS} from "../../../../lib/types/Moods";
import {GENRES} from "../../../../lib/types/Genres";
import {Rating} from "../../shared/models/Rating";
import {Listen} from "../../shared/models/Listen";

// These uids corospond to files stored in s3
const realFileUids = [
    'c13a5585-963e-484d-94fb-fec1632e20b0',
    'c121bc83-9021-42b8-9e4d-c8fcb483f802',
    'bff954f5-f9b1-4f1e-9bea-5b817a56af1e',
    'bee9bae7-1827-433b-91bb-fac492a3ccb0',
    'bed1ee8b-650f-47b2-b561-7ccd6e21380f',
    'bebb0cc7-e7ee-4ba4-9997-db255440f578',
    'bdcfeec2-e46e-48c0-ad24-c329665db518',
    'bc304842-6fac-4d19-abe5-c008958da4ea',
    'bbdf8cc0-eb49-4817-8e85-13af5e4fe628',
    'bbb2ee66-9a2f-49dc-af4f-9f26d2401b5e',
    'ba5c68ae-53aa-4297-8c2c-a174d86af538',
    'b9b17b66-cd5a-451a-a72d-3f394d9c6f25',
    'b972777a-e2c7-4d2e-a7d1-863e47206a91',
    'b92eb06d-55ef-4ae6-a77c-545e782aeab4',
    'b9124c2b-d900-4b7f-a3f6-d986452dd656',
    'b8d2fd8a-35da-47cf-b9f3-e1c1c05ff74b',
    'b77cada4-0f50-4073-bdd9-31bc38a3e3dc',
    'b7160577-014e-412a-980f-dd47af1c54be',
    'b6a71ff5-aa07-4690-b869-0c1fc37b3473',
    'b59b794d-53ce-4395-b96b-696c0f12ff32',
    'b2148c7f-8860-404c-b830-3efeb6274fd5',
    'b0828c91-7b80-4315-8b7c-39a9c08ee5a2',
    'b06fdf02-cb33-4599-b214-657b7a6a6690',
    'aeaf07d5-331b-41fc-b2b9-f8c1cea8b76a',
    'aeaaf8fe-3028-4588-8f6f-6f61677fa930',
    'ac88376e-40b9-4c5c-afb3-f9b5d200630c',
    'ab88b820-59c3-4a72-ac95-cbbfa373061d',
    'aa7f5f13-d06d-4992-b49b-55de5378e2fc',
    'a924c962-185e-411d-bafe-f58f6cc15472',
    'a8f9d23e-4347-4c35-86eb-ae9292f09ac6',
    'a8f10550-d90a-48cc-9635-1524601466e0',
    'a8778492-3497-4c86-9981-565dbcce6993',
    'a85076fa-8562-4e56-b1bd-ccb422fb58ee',
    'a7d9685f-7ba1-429b-9a5c-c8ad0616bbd5',
    'a7af40fc-0b18-4bf3-8477-98330cf5335e',
    'a6f10145-3609-4593-83d2-3bcc437a639a',
    'a68c9b04-b538-499b-82bb-b0171e2f2dec',
    'a5f00145-34d8-4516-ab70-680e54355a2f',
    'a4e9408c-0465-4083-a134-223e6874c8c6',
    'a4491c5a-ce5e-41b8-90cb-5b38defdb85b',
    'a3ffa160-4319-49c7-99e0-dfb376021534',
    'a1f7fb9b-a758-48bb-afda-f84693cb5394',
    'a1db5061-e34f-4498-8659-61fc90c80cab',
    'a188c8aa-b359-4d5f-b2cd-6607a89f83b1',
    'a0eac1da-89ae-439a-8913-412e96a70243',
    '9fdcc3a0-f723-4a6f-808f-2ee8a903870c',
    '9f538e8e-2009-4f04-a96d-287e01b0dd93',
    '9cd3dcf1-d7c1-4b4d-a193-15e6fe4606b9',
    '9b16deda-3bf7-48c6-80d5-6de62c341b16',
    '9ac7cc73-0aeb-4ef1-bca8-96ac84072ebd',
    '9a0791e3-832b-4398-af2c-fda5b315bb80',
    '99bd14de-ca59-476c-b927-337558c24821',
    '99337d29-6668-4269-b6da-e062856d8d89',
    '98d38d17-1161-4b8f-a84e-cb8f570dc3c6',
    '97e71a00-6ecf-4976-86d7-f0cae71e722a',
    '96b2b065-b5c7-456c-ae4d-a9dc3b7aa578',
    '96730f1b-ad69-437d-96e9-768bd36b740e',
    '965257fc-7246-4fda-8954-cf97cec2db1c',
    '94f73c3e-24fe-4657-ae27-5ea08e34d64c',
    '927da258-7f60-4538-822f-51af9a6a768e',
    '90b7819b-907c-44ad-adaa-96b5c751f71c',
    '8fea9a05-570b-4a58-a952-433a7dba184b',
    '8dae4bea-f30d-4c4a-b954-5374ef080a07',
    '8d052c4d-8b26-4c6f-84f2-def37d178b4b',
    '8c529aa1-41b8-43da-8399-965ee0971c2a',
    '8c35306c-5551-49fa-b60a-33769b27a8de',
    '8ba92dc8-c0f6-4b24-8f07-0258b142734e',
    '8adc715f-accc-4710-8a82-8783d84e1cff',
    '897963ed-c9d2-4ff4-a03b-cf9e6b5a4c81',
    '88f53ba4-1e32-4450-bb54-56273140ccbf',
    '88d4bf74-4e97-4660-b9da-94a5dd81fb9a',
    '88230e71-a87d-4faa-8895-51b8fdaacdbf',
    '87f95507-3a2c-4add-926a-f9542ce014cc',
    '87c90bbe-8708-4d3e-9c5f-89e9f528c55e',
    '8618aced-cab6-4f68-bfa4-f61a4732fe58',
    '83fcdfba-21ed-4374-9115-9ccd49e5a1ed',
    '83e84072-0dea-45d3-b386-bffdeb881cb7',
    '83584596-10c1-4edb-a264-95a303839e23',
    '82564738-6547-4c73-af39-1a6f23d9d96f',
    '80f1320f-bf73-4b72-bb02-9220baa96f0d',
    '800ade33-fa81-4d77-9b13-38bee218e287',
    '7f2aadcc-3aed-4fae-b5f4-717f715b5f4e',
    '7debfde0-c529-49d7-98a6-aad07acb99fc',
    '7cedbaec-688d-4fb0-9faa-467644a3fe1c',
    '7b730903-4577-4398-950b-9e3ccda424ee',
    '7b44b352-0220-4295-bef7-44820d0c71d2',
    '7aa3b7cc-b461-43d9-8e3e-317c14f77e53',
    '6fdabe2d-a377-45ba-bb3e-cfa6a25edc6f',
    '6ed52ee2-7728-4241-b573-b9855e1f3cdb',
    '6e1e68a7-6e00-4bd9-88db-07dcf079a6f9',
    '68b78fb7-41b2-4a44-822e-21510380eca7',
    '65601788-a579-4d96-b0ca-24ec7a16a9d4',
    '65144d11-38d3-4628-bd29-442e9318bba4',
    '6438ed8d-4027-4a13-b8ea-c412acf5e6b1',
    '63a8f7a4-d8b2-461f-bf66-2d4ad91bd9cc',
    '62950f00-f09d-45dd-a10f-9f39ca448a2c',
    '6170a4de-c4af-4fc5-b72a-0fe5c8ef0eb0',
    '613f669f-a626-479b-b700-73f6e5344154',
    '6132401b-93bd-4563-8d31-3c7761246a3b',
    '5ed7edac-6797-44da-8698-35e4acfb258b',
];

export async function createSongs(artistUid: string, expertUid: string) {

    const songs = await Song.bulkCreate(
        realFileUids.map((e) => ({
            uid: e,
            userUid: artistUid,
            title: faker.company.companyName(),
            paid: true,
            paymentDate: new Date(),
            moodID: getRandomElement(MOODS).id,
            genreID: getRandomElement(GENRES).id,
        }))
    );

    // Add some ratings
    await Promise.all(
        songs.map((e) => {
            const ratings = [];
            const length = Math.floor(Math.random() * 30);
            for (let i = 0; i < length; i++) {
                ratings.push({
                    userUid: expertUid,
                    songUid: e.uid,
                    score: Math.floor(Math.random() * 10) + 1,
                });
            }
            return Rating.bulkCreate(ratings);
        })
    );

    // Add some listens
    await Promise.all(
        songs.map((e) => {
            const listens = [];
            const length = Math.floor(Math.random() * 30);
            for (let i = 0; i < length; i++) {
                listens.push({
                    userUid: expertUid,
                    songUid: e.uid,
                    duration: Math.floor(Math.random() * 60) + 1,
                });
            }
            return Listen.bulkCreate(listens);
        })
    );
}