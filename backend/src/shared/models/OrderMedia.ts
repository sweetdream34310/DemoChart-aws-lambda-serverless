import { ServiceOfferOrder } from './ServiceOfferOrder';
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

@Table({ paranoid: true })
export class OrderMedia extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING({ length: 64 }))
    uid!: number;

    @ForeignKey(() => ServiceOfferOrder)
    @Column(DataType.STRING({ length: 64 }))
    orderUid!: string;

    @BelongsTo(() => ServiceOfferOrder)
    order!: ServiceOfferOrder;

	@Column
	mediaUrl!: string;

    @Column
	arrayPosition!: number;

    @Column
	fileEnding!: string;
}
