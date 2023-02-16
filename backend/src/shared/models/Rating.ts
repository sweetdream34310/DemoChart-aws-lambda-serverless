import {
  AllowNull,
  BelongsTo, Column,


  DataType,
  Default,
  ForeignKey, Model,
  PrimaryKey, Table
} from 'sequelize-typescript';
import { Song } from './Song';
import { User } from './User';

@Table({ paranoid: true })
export class Rating extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: number;

	@ForeignKey(() => Song)
	@Column(DataType.STRING({ length: 64 }))
	songUid!: string;

	@BelongsTo(() => Song)
	song!: Song;

	@ForeignKey(() => User)
	@Column(DataType.STRING({ length: 64 }))
	userUid!: string;

	@BelongsTo(() => User)
	user!: User;

	@AllowNull(false)
	@Column
	score!: number;
}
