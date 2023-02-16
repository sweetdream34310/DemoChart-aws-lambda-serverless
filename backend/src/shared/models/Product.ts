import {
	BelongsToMany,
	Column,
	DataType,
	Default, HasMany,
	Model,
	PrimaryKey,
	Table, Unique
} from 'sequelize-typescript';
import {ProductOrder} from "./ProductOrder";
import {Order} from "./Order";

@Table({ paranoid: true })
export class Product extends Model {

	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: string;

	@Column
	name!: string;

	@Column
	imageUrl!: string;

	@Column
	description!: string;

	@Column
	brand!: string;

	@Column
	category!: string;

	@Column
	price!: number;

	@Column
	priceOld!: number;

	@Column
	countInStock!: number;

	@Column
	rating!: number;

	@Column
	numReviews!: number;

	@Column
	tags!: string;

	@Column
	copiesSold!: number;
	
	@Column
	copiesAvailable!: number;
	
	@Column
	songFile!: string;
	
	@Column
	songUrl!: string;
	
	@Column
	songBy!: string;
	
	@Column
	songDescription!: string;
	
	@Column
	songTags!: string;

	@Column
	downloadLink!: string;

	@Column
	isBump!: boolean;

	@Column
	bumpPrice!: string;
	
	@Column
	active!: boolean;


	// @BelongsToMany(() => Order, () => ProductOrder)
	// orders!: Order[]

	@HasMany(() => ProductOrder)
	productOrder!: ProductOrder[];

}
