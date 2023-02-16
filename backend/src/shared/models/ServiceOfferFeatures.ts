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
export class ServiceOfferFeatures extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING({ length: 64 }))
    uid!: number;

    @ForeignKey(() => ServiceOffer)
    @Column(DataType.STRING({ length: 64 }))
    serviceOfferUid!: string;

    @BelongsTo(() => ServiceOffer)
    serviceOffer!: ServiceOffer;

    @Column
    name!: string;

    @Column
    arrayPosition!: number;
}
