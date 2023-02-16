import {
  AllowNull, BelongsTo, BelongsToMany, Column,
  HasMany,
  Model,

  PrimaryKey, Table
} from 'sequelize-typescript';
import { Gig } from './Gig';
import { GigGenres } from './GigGenres';

@Table({ paranoid: true })
export class Genre extends Model {
	@PrimaryKey
	@Column
	id!: number;

	@HasMany(() => GigGenres)
	gigGenres!: GigGenres[];

	@AllowNull(false)
	@Column
	name!: string;
}
