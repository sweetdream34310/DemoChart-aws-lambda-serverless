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
export class Payment extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: string;

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column(DataType.STRING({ length: 64 }))
	userUid!: string;

	@BelongsTo(() => User)
	user!: User;

	@ForeignKey(() => Song)
	@Column(DataType.STRING({ length: 64 }))
	songUid!: string;

	@BelongsTo(() => Song)
	song!: Song;

	@AllowNull(false)
	@Column
	molliePaymentID!: string;

	@AllowNull(false)
	@Column
	method!: string;

	@AllowNull(false)
	@Column
	status!: string;

	@AllowNull(false)
	@Column(DataType.FLOAT)
	amount!: number;

	@AllowNull(false)
	@Column
	currency!: string;

	@AllowNull(false)
	@Column
	credits!: number;
}
