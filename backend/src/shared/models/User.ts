import { ServiceOfferOrder } from './ServiceOfferOrder';
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
} from 'sequelize-typescript';
import { UserTypes } from '../../../../lib/types/UserTypes';
import { Country } from './Country';
import { GigReview } from './GigReview';
import { Listen } from './Listen';
import { ProfileListItem } from './ProfileListItem';
import { Rating } from './Rating';
import { Seller } from './Seller';
import { SocialMedia } from './SocialMedia';
import { Song } from './Song';
import {UnreadChat} from "./UnreadChat";

@Table({ paranoid: true })
export class User extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: string;

	@AllowNull(false)
	@Column
	email!: string;

	@Column(DataType.STRING({ length: 64 }))
	name!: string;

	@AllowNull(false)
	@Column(DataType.STRING( { length: 64 }))
	firstName!: string;

	@AllowNull(false)
	@Column(DataType.STRING( { length: 64 }))
	lastName!: string;

	@Unique({ name: 'slug', msg: 'slug' })
	@Column(DataType.STRING( { length: 64 }))
	slug!: string;

	@Column
	approvedByAdmin?: boolean;

	@Column
	approvedByAdminDate?: Date;

	@Column
	declinedByAdmin?: Date;

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

	@Column
	artistName!: string;

	@AllowNull(false)
	@Column
	userType!: UserTypes;

	@Column
	city!: string;

	@AllowNull(false)
	@Default(0)
	@Column
	credits!: number;

	@Column
	industryID!: number;

	@Column
	genreID!: number;

	@AllowNull(false)
	@ForeignKey(() => Country)
	@Column
	countryID!: number;

	@BelongsTo(() => Country)
	country!: Country;

	@Column
	mollieCustomerID!: string;
	
	@HasOne(() => Seller)
	reseller!: Seller;

	@HasMany(() => Song)
	uploadedSongs!: Song[];

	@HasMany(() => ProfileListItem)
	profileListItems!: ProfileListItem[];

	@HasMany(() => SocialMedia)
	socialMedias!: SocialMedia[];

	@HasMany(() => Rating)
	ratings!: Rating[];

	@HasMany(() => Listen)
	listens!: Listen[];

	@HasMany(() => UnreadChat)
	unreadChatSenders!: UnreadChat[];

	@Column
	wsSessionId!: string;

	@Column
	newsletter?: boolean;

	@Column
	applicationSocialProfileName?: string;

	@Column
	applicationSocialProfilePlatform?: string;

	@Column
	applicationMusicProfileName?: string;

	@Column
	applicationMusicProfilePlatform?: string;

	@Column
	lastLogin?: string;
}
