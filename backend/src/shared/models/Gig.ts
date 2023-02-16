import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import { GigCategories } from "./GigCategories";
import { GigFaq } from "./GigFaq";
import { GigGenres } from "./GigGenres";
import { GigMedia } from "./GigMedia";
import { GigReferences } from "./GigReferences";
import { GigReview } from "./GigReview";
import {Seller} from "./Seller";
import { ServiceOffer } from "./ServiceOffer";
import {SavedGigs} from "./SavedGigs";

@Table({ paranoid: true })
export class Gig extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING({ length: 64 }))
    uid!: string;

    @Column
	name!: string;

    @Column
	slug!: string;

    @Column
	active!: boolean;
    
    @Column
	price!: number;

    @Column
	currency!: string;
    
    @Column(DataType.TEXT)
	description!: string;

    @HasMany(() => GigCategories)
    gigCategories!: GigCategories[];

	@HasMany(() => GigGenres)
	gigGenres!: GigGenres[];

    @HasMany(() => GigReferences)
	gigReferences!: GigReferences[];
    
    @HasMany(() => GigMedia)
	gigMedias!: GigMedia[];

    @HasMany(() => ServiceOffer)
	gigServiceOffers!: ServiceOffer[];

	@HasMany(() => GigFaq)
	gigFaqs!: GigFaq[];

    @BelongsTo(() => Seller)
	seller!: Seller;

    @HasMany(() => SavedGigs)
    savedByUser!: SavedGigs[] | boolean;

    @ForeignKey(() => Seller) 
    @Column(DataType.STRING({ length: 64 })) 
    sellerUid!: string;

    @Column
    averageRating!: number;

    @Column
	welcomeMessage!: string;

    @Column
	experienceYears!: number;

    @Column
	completed!: boolean;
}
