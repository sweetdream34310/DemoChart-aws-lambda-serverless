import {
  AllowNull, Column,
  Model,

  PrimaryKey, Table
} from 'sequelize-typescript';

@Table({ paranoid: true })
export class Mood extends Model {
	@PrimaryKey
	@Column
	id!: number;

	@AllowNull(false)
	@Column
	name!: string;
}
