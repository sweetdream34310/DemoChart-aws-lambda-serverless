import {
    BelongsTo, BelongsToMany,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {User} from "./User";
import {Product} from "./Product";
import {ProductOrder} from "./ProductOrder";
import {Rating} from "./Rating";

@Table({ paranoid: true })
export class Order extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING({ length: 64 }))
    uid!: string;

    @ForeignKey(() => User)
    @Column(DataType.STRING({ length: 64 }))
    userUid!: string;

    @BelongsTo(() => User)
    user!: User;

    @Column
    email!: string;

    // @BelongsToMany(() => Product, () => ProductOrder)
    // products!: Product[]

    @HasMany(() => ProductOrder)
    productOrder!: ProductOrder[];


    @Column
    orderDate!: Date;

    @Column
    invoiceAmount!: number;

    @Column
    currency!: string;

    @Column
    paypalOrderId!: string;

    @Column
    state!: string;
}