import {
	BelongsTo, Column,


	DataType,
	Default, DeletedAt, CreatedAt,
	ForeignKey, Model,
	PrimaryKey, Table, BelongsToManyAssociation, BelongsToMany
} from 'sequelize-typescript';
import { User } from './User';

@Table({ paranoid: true })
export class Favorites extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: number;


	// @BelongsToMany(() => User, {
	// 	as: 'follower',
	// 	onDelete: 'cascade',
	// })
	@BelongsTo(() => User, {as: 'followed'})
	@ForeignKey(() => User)
	@Column(DataType.STRING({ length: 64 }))
	followedUid!: string;

	@BelongsTo(() => User, {as: 'follower'})
	@ForeignKey(() => User)
	@Column(DataType.STRING({ length: 64 }))
	followerUid!: string;


	@CreatedAt
	followedAt?: Date;

	@DeletedAt
	unfollowedAt?: Date;
}
//
// Favorites.belongsTo(User, { as: 'follower' });
// Favorites.belongsTo(User, { as: 'followed' });

// migration.addIndex('relationship', ['follower_id']);
// migration.addIndex('relationship', ['followed_id']);
// migration.addIndex('relationship', ['follower_id', 'followed_id'], {
// 	indicesType: 'UNIQUE'
// });

