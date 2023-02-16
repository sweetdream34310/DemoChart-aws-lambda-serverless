import {IKeyValue} from "../../web_app/src/app/types/KeyValue";

export interface ISongFilter {
    songID?: string;
    filter?: {
        genres: IKeyValue[]
    },
}