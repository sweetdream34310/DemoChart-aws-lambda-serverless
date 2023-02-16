import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import {User} from "./User";
import {Product} from "./Product";
import {ProductOrder} from "./ProductOrder";
import {Rating} from "./Rating";
import { Gig } from "./Gig";
import { GigReview } from "./GigReview";

@Table({ paranoid: true })
export class Seller extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING({ length: 64 }))
    uid!: string;

	@Column
	profileImageSrc!: string;

    @Unique({ name: 'slugSeller', msg: 'slugSeller' })
    @Column(DataType.STRING( { length: 64 }))
	slug!: string;

    @Column
	userName!: string;

    @Column
    aboutMe!: string;

    @Column
	experienceYears!: number;

    @Column
	gigsCompleted!: number;

    @Column
	activeSeller!: boolean;

    @Column
	jobTitle!: string;

    @Column
	customLabel!: string;

    @Column
	customLabelValue!: string;
    
    @Column
	approvedByAdmin!: boolean;

    @HasMany(() => Gig)
	gigs!: Gig[];
    
    @BelongsTo(() => User)
	user!: User;

    @ForeignKey(() => User) 
    @Column(DataType.STRING({ length: 64 })) 
    userUid!: string;
}