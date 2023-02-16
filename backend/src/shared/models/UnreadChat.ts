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
export class UnreadChat extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: number;

	@ForeignKey(() => User)
	@Column(DataType.STRING({ length: 64 }))
	recipientUid!: string;

	@Column(DataType.STRING({ length: 64 }))
	chatUid!: string;
}
