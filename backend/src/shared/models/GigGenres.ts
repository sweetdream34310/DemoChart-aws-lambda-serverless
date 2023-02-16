import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import { Genre } from "./Genre";
import { Gig } from "./Gig";

@Table({ paranoid: true })
export class GigGenres extends Model {

	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: number;

	@ForeignKey(() => Gig)
	@Column(DataType.STRING({ length: 64 }))
	gigUid!: string;

	@BelongsTo(() => Gig)
	song!: Gig;

	@ForeignKey(() => Genre)
	@Column
	genreId!: number;

	@BelongsTo(() => Genre)
	genre!: Genre;
}