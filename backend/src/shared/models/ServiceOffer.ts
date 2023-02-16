import {
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import { Gig } from './Gig';
import { ServiceOfferFeatures } from './ServiceOfferFeatures';

@Table({ paranoid: true })
export class ServiceOffer extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING({ length: 64 }))
    uid!: number;

    @ForeignKey(() => Gig)
    @Column(DataType.STRING({ length: 64 }))
    gigUid!: string;

    @BelongsTo(() => Gig)
    gig!: Gig;

	@Column
	offerName!: string;
    
	@Column
	offerDescription!: string;

    @Column
	welcomeMessage!: string;

    @Column
    offerPrice!: number;
    
    @Column
    numRevisions!: number;

    @Column
    deliveryTime!: number;

    @HasMany(() => ServiceOfferFeatures)
	features!: ServiceOfferFeatures[];

    @Column
    arrayPosition!: number;
}
