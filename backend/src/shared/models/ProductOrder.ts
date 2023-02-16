import {
	Column,
	DataType,
	Default,
	HasMany,
	Model,
	PrimaryKey,
	ForeignKey,
	Table, BelongsTo
} from 'sequelize-typescript';
import {User} from "./User";
import {Product} from "./Product";
import {Order} from "./Order";
import {Song} from "./Song";

@Table
export class ProductOrder extends Model {
	// @ForeignKey(() => Order)
	// @Column
	// orderId!: string;
	//
	// @ForeignKey(() => Product)
	// @Column
	// productId!: string;


	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: number;

	@ForeignKey(() => Order)
	@Column(DataType.STRING({ length: 64 }))
	orderUid!: string;

	@BelongsTo(() => Order)
	order!: Order;

	@ForeignKey(() => Product)
	@Column(DataType.STRING({ length: 64 }))
	productUid!: string;

	@BelongsTo(() => Product)
	product!: Product;
}