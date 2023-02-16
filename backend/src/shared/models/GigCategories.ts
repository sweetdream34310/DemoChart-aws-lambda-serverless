import { Category } from './Category';
import {
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Gig } from "./Gig";

@Table({ paranoid: true })
export class GigCategories extends Model {

	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: number;

	@ForeignKey(() => Gig)
	@Column(DataType.STRING({ length: 64 }))
	gigUid!: string;

	@BelongsTo(() => Gig)
	gig!: Gig;

	@ForeignKey(() => Category)
	@Column
	categoryCode!: number;

	@BelongsTo(() => Category)
	category!: Category;
}