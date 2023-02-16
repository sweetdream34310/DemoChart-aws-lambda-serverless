import {
	BelongsTo, Column,
	DataType,
	Default, DeletedAt, CreatedAt,
	ForeignKey, Model,
	PrimaryKey, Table, BelongsToManyAssociation, BelongsToMany
} from 'sequelize-typescript';
import { User } from './User';
import { Gig } from './Gig';

@Table({ paranoid: true })
export class SavedGigs extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.STRING({ length: 64 }))
	uid!: number;

	// @BelongsToMany(() => User, {
	// 	as: 'follower',
	// 	onDelete: 'cascade',
	// })
	@BelongsTo(() => User, {as: 'user'})
	@ForeignKey(() => User)
	@Column(DataType.STRING({ length: 64 }))
	userUid!: string;

	@BelongsTo(() => Gig, {as: 'savedGig'})
	@ForeignKey(() => Gig)
	@Column(DataType.STRING({ length: 64 }))
	gigUid!: string;

	@CreatedAt
	savedAt?: Date;

    @DeletedAt
	unsavedAt?: Date;
}
//
// Favorites.belongsTo(User, { as: 'follower' });
// Favorites.belongsTo(User, { as: 'followed' });

// migration.addIndex('relationship', ['follower_id']);
// migration.addIndex('relationship', ['followed_id']);
// migration.addIndex('relationship', ['follower_id', 'followed_id'], {
// 	indicesType: 'UNIQUE'
// });

