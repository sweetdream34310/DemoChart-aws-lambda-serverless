import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { UserTypes } from '../../../../lib/types/UserTypes';
import { Country } from './Country';
import { Listen } from './Listen';
import { ProfileListItem } from './ProfileListItem';
import { Rating } from './Rating';
import { SocialMedia } from './SocialMedia';
import { Song } from './Song';
import {Favorites} from "./Favorites";

@Table({ paranoid: true })
export class UserTest extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: string;

	@AllowNull(false)
	@Column
	email!: string;

	@AllowNull(false)
	@Column(DataType.STRING({ length: 64 }))
	name!: string;

	@Column
	bio!: string;

	@Column
	profileHeaderSrc!: string;

	@Column
	profileImageSrc!: string;

	@AllowNull(false)
	@Column
	jobTitle!: string;

	@Column
	company!: string;

}
