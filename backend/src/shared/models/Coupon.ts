import {
	Column,
	DataType,
	Default, Model,
	PrimaryKey,
	Table
} from 'sequelize-typescript';

@Table({ paranoid: true })
export class Coupon extends Model {

	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: number;

	@Column(DataType.STRING({ length: 64 }))
	name!: string;

	@Column(DataType.STRING({ length: 64 }))
	discount!: string;

	@Column(DataType.STRING({ length: 64 }))
	type!: string;

	@Column(DataType.STRING({ length: 64 }))
	product!: string;

	// @BelongsToMany(() => Order, () => ProductOrder)
	// orders!: Order[]

	// @HasMany(() => ProductOrder)
	// productOrder!: ProductOrder[];

}
