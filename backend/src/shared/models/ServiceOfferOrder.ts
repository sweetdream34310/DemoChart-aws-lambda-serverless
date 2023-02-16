import { OrderMedia } from './OrderMedia';
import { HasMany } from 'sequelize-typescript';
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

import { ServiceOffer } from './ServiceOffer';

@Table({ paranoid: true })
export class ServiceOfferOrder extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING({ length: 64 }))
    uid!: string;

    @ForeignKey(() => ServiceOffer)
    @Column(DataType.STRING({ length: 64 }))
    serviceOfferUid!: string;

    @BelongsTo(() => ServiceOffer)
    serviceOffer!: ServiceOffer;

    @Column
    orderPrice!: number;

    @Column
    orderStatus!: string;

    @Column
    orderDue!: string;

    @Column
    orderDate!: string;

    @Column
    paypalOrderId!: string;
    
    @Column
    buyerUid!: string;

    @Column
    sellerUid!: string;

    @Column
    buyerMessage!: string;

    @HasMany(() => OrderMedia)
	orderMedias!: OrderMedia[];
}
