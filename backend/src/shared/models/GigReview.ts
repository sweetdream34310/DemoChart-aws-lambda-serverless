import {
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import { Gig } from './Gig';
import { Seller } from './Seller';
import { User } from './User';

@Table({ paranoid: true })
export class GigReview extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING({ length: 64 }))
    uid!: number;

    @ForeignKey(() => Gig)
    @Column(DataType.STRING({ length: 64 }))
    gigUid!: string;

    @BelongsTo(() => Gig)
    gig!: Gig;

    @BelongsTo(() => Seller)
	seller!: Seller;

    @ForeignKey(() => Seller) 
    @Column(DataType.STRING({ length: 64 })) 
    sellerUid!: string;

    @BelongsTo(() => User)
	user!: User;

    @ForeignKey(() => User) 
    @Column(DataType.STRING({ length: 64 })) 
    userUid!: string;

	@Column
	ratingGeneral!: number;

    @Column
	ratingCommunication!: number;

    @Column
	ratingDescribedService!: number;

    @Column
	ratingResellRecommendation!: number;

    @Column
	ratingAverage!: number;

    @Column
    name!: string;

    @Column
    description!: string;
}
