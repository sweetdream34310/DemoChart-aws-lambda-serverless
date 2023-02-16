import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { User } from './User';

@Table({ paranoid: true })
export class SocialMedia extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: string;

	@ForeignKey(() => User)
	@Column(DataType.STRING({ length: 64 }))
	userUid!: string;

	@BelongsTo(() => User)
	user!: User;

	@AllowNull(false)
	@Column
	platform!: string;

	@AllowNull(false)
	@Column
	link!: string;

	@AllowNull(false)
	@Column
	linkText!: string;
}
