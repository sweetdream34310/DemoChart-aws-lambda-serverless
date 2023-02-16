export interface IOrder {
  uid: string,
  sellerUid: string;
  gigUid: string;
  gigName: string;
  offerName: string;
  buyerUid: string;
  orderStatus: string;
  orderPrice: number;
  orderDue: number;
  serviceOfferUid: string;
  orderDate?: string;
  buyerMessage: string;
  orderMedias: IOrderMedias[]
}

export interface IDbModel {
  uid?: string;
  gigUid?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface IOrderMedias extends IDbModel {
  mediaUrl: string,
  fileEnding: string,
  arrayPosition: number
}

export interface IGigServiceOffers extends IDbModel {
  offerName: string;
  offerDescription?: string;
  welcomeMessage?: string | null;
  offerPrice?: number;
  numRevision?: number;
  deliveryTime?: number;
  arrayPosition: number;
  features: IServiceOfferFeatures[];
}

export interface IServiceOfferFeatures extends IDbModel {
  serviceOfferUid: string;
  name: string;
  arrayPosition: number;
}

export interface IGigFaqs extends IDbModel {
  question: string;
  answer: string;
  arrayPosition: number;
}

export interface IActiveGig {
  uid?: string,
  name?: string;
  experienceYears?: number;
  description?: string;
  welcomeMessage?: string | null;
  savedByUser?: boolean;
  completed?: boolean;
  gigCategories: IGigCategory[];
  gigGenres: IGigGenres[];
  gigReferences: IGigReferences[];
  gigMedias: IGigMedias[];
  gigVideos: [];
  gigServiceOffers: IGigServiceOffers[];
  gigFaqs: IGigFaqs[];
}

export interface IGigMedias extends IDbModel {
  mediaUrl: string;
  isVideo: boolean;
  arraPostion: number;
}

export interface IGigReferences extends IDbModel {
  img?: string;
  name?: string;
  description?: string;
  arrayPosition: number;
}

export interface IGenre extends IDbModel {
  id: number;
  name: string;
}

export interface IGigGenres extends IDbModel {
  genreId: number | undefined;
  genre?: IGenre;
}

export interface IGigCategory extends IDbModel {
  categoryCode?: number;
  category?: ICategory;
}

export interface ICategory {
  categoryCode: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
