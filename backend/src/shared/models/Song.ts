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
import { Genre } from './Genre';
import { Listen } from './Listen';
import { Mood } from './Mood';
import { Rating } from './Rating';
import { User } from './User';

@Table({ paranoid: true })
export class Song extends Model {
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
	title!: string;

	@BelongsTo(() => Mood)
	mood!: Mood;

	@ForeignKey(() => Mood)
	@Column
	moodID!: number;

	@BelongsTo(() => Genre)
	genre!: Genre;

	@ForeignKey(() => Genre)
	@Column
	genreID!: number;

	@Column
	paid!: boolean;

	@Default(false)
	@Column
	disabledByAdmin!: boolean;

	@Column
	paymentDate!: Date;

	@HasMany(() => Rating)
	ratings!: Rating[];

	@HasMany(() => Listen)
	listens!: Listen[];

	@Default(undefined)
	@Column
	chartPosition!: number;
}
